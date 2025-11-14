import { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";




import Login from "./pages/Login";
import Home from "./pages/Home";


const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  
  return (

    <div data-theme="emerald">
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<Login />} />
        
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
