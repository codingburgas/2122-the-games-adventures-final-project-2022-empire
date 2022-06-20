import { useContext, Suspense, useState, createContext, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/index"));
const Game = lazy(() => import("./pages/game"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
//const UserContext = createContext();

function App() {  
  return(
    <Router>
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
    </Router>
  );
}

export default App;
