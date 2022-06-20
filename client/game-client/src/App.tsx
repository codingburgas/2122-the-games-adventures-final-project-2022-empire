import { useContext, Suspense, useState, createContext, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/index"));
const Game = lazy(() => import("./pages/game"));
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
        </Suspense>
    </Router>
  );
}

export default App;
