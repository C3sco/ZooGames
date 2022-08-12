import React from "react";
import './App.css';
import './App.js';
import { Routes, Route } from "react-router-dom";
import Homepage from './Homepage/Homepage'
import Giochi from './Homepage/Giochi'
import Navbar from './navbar'

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route element={<Giochi />} />
          </Route>
        </Routes>
      </div>

    </>

  );
}

export default App;
