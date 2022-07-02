import { useEffect, Suspense, useState, createContext, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchAPI, fetchUser, validateToken } from "./api";

import { readStorage, deleteStorage, writeStorage } from "./localstorage";

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Failback from "./pages/Fallback";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Index = lazy(() => import("./pages/index"));
const Game = lazy(() => import("./pages/Game"));
const Account = lazy(() => import("./pages/Account"));

import "./App.css";

interface userContextInterface {
  authenticated?: boolean;
  isLoading?: boolean;
  token?: string | null;
  userData?: any | null;
  loginUser?: Function;
  registerUser?: Function;
}

const UserContext = createContext<userContextInterface | null>(null);

const MySwal = withReactContent(Swal);

function App() {
  const [state, setState] = useState<userContextInterface | null>({
    authenticated: false,
    isLoading: true,
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

  if (state?.isLoading) {
    return <Failback />;
  }

  const loginUser = async (userData: object) => {
    return new Promise((resolve, reject) => {
      fetchAPI("/login", userData, {}, "POST")
        .then((responseData) => {
          if (responseData.response === "Success") {
            fetchUser(responseData.data).then((userDataFromServer) => {
              let updatedState = {
                userData: userDataFromServer.data,
                token: responseData.data,
                authenticated: true,
              };

              setState((prevState) => {
                return { ...prevState, ...updatedState };
              });

              writeStorage("auth", updatedState.token);

              resolve({});
            });
          } else {
            reject(responseData.response);
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

  const registerUser = async (userData: object) => {
    return new Promise((resolve, reject) => {
      fetchAPI("/register", userData, {}, "POST")
        .then((responseData) => {
          if (responseData.response === "Success") {
            resolve(responseData);
          } else {
            reject(responseData.response);
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
          loginUser,
          registerUser,
        }}
      >
        <Suspense fallback={<Failback />}>
          <Routes>
            <Route
              path="/game"
              element={
                <AuthenticatedRoute>
                  <Game />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <AuthenticatedRoute>
                  <Account />
                </AuthenticatedRoute>
              }
            />
            <Route path="/" element={<Index />} />
          </Routes>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export { App, UserContext };
