import { useEffect, Suspense, useState, createContext, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchAPI, fetchUser, validateToken } from "./api";

import { readStorage, deleteStorage, writeStorage } from "./localstorage";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Index = lazy(() => import("./pages/index"));
const Game = lazy(() => import("./pages/game"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

interface userContextInterface {
  authenticated?: boolean;
  token?: string | null;
  userData?: Object | null;
  loginUser?: any
}

const UserContext = createContext<userContextInterface | null>(null);

const MySwal = withReactContent(Swal);

function App() {
  const [state, setState] = useState<userContextInterface | null>({
    authenticated: false,
  });

  useEffect(() => {
    let token = readStorage("auth");

    if (!token) {
      deleteStorage("auth");
      let updatedState = {
        ...state,
        authenticated: false,
        userData: null,
        isLoading: false,
      };
      setState(updatedState);
      return;
    } else {
      validateToken(token).then((isValid) => {
        if (isValid) {
          fetchUser(String(token)).then((userData) => {
            let updatedState = {
              userData: userData.data,
              token,
              authenticated: true,
              isLoading: false,
            };

            setState((prevState) => {
              return { ...prevState, ...updatedState };
            });
          });
        } else {
          deleteStorage("auth");
          let updatedState = {
            ...state,
            authenticated: false,
            userData: null,
            isLoading: false,
          };
          setState(updatedState);
          return;
        }
      });
    }
  }, []);

  const loginUser = async (userData: object) => {
    return new Promise((resolve, reject) => {
      fetchAPI("/login", userData, {}, "POST")
        .then((responseData) => {
          if (responseData.type === "login-success") {
            fetchUser(responseData.data[0]).then((userDataFromServer) => {
              let updatedState = {
                userData: userDataFromServer.data,
                token: responseData.data[0],
                authenticated: true,
              };

              setState((prevState) => {
                return { ...prevState, ...updatedState };
              });

              writeStorage("auth", updatedState.token);
              writeStorage("refresh", responseData.data[1]);

              resolve({});
            });
          } else {
            reject(responseData);
          }
        })
        .catch((error) => {
          console.log(`Internal server error: ${error}`);

          MySwal.fire(
            'Oops...',
            'There was problem with the server. Please try again later!',
            'error'
          );

          reject(error);
        });
    });
  }

  const registerUser = async (userData: object) => {
    return new Promise((resolve, reject) => {
      fetchAPI("/register", userData, {}, "POST")
        .then((responseData) => {
          if (responseData.type === "register-success") {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        })
        .catch((error) => {
          console.log(`Internal server error: ${error}`);

          MySwal.fire(
            "Oops...",
            "There was problem with the server. Please try again later!",
            "error"
          );

          reject(error);
        });
    });
  };

  return (
    <Router>
      <UserContext.Provider
        value={{
          authenticated: state?.authenticated,
          token: state?.token,
          userData: state?.userData,
          loginUser
        }}
      >
        <Suspense>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
          <Routes>
            <Route path="/game" element={<Game />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export { App, UserContext };