import React from "react";
import './App.css';
import './App.js';
import { Routes, Route } from "react-router-dom";
import Homepage from './Homepage/Homepage'
import Giochi from './Homepage/Giochi'
import Curiosita from './Homepage/Curiosita'
import Navbar from './navbar'
import Login from "./Homepage/Login";
import Comunita from "./Homepage/Comunita";


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/Homepage/Homepage" index element={<Homepage />} />
          <Route path="/Homepage/Giochi" element={<Giochi />} />
          <Route path="/Homepage/Login" element={<Login />} />
          <Route path="/Homepage/Curiosita" element={<Curiosita />} />
          <Route path="/Homepage/Comunita" element={<Comunita />} />
        </Routes>
      </div>

    </>

  );
}

export default App;
