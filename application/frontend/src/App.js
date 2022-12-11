import React from "react";
import './App.css';
import './App.js';
import { Routes, Route } from "react-router-dom";
import Homepage from './Homepage/Javascript/Homepage.js'
import Giochi from './Homepage/Javascript/Giochi.js'
import Curiosita from './Homepage/Javascript/Curiosita.js'
import Navbar from './components/Navbar.js'
//import Login from "./Homepage/Login";
import Comunita from "./Homepage/Javascript/Comunita.js";
import Notizie from "./Giochi/Notizie.js"
import Video from "./Giochi/Video.js"
import Impiccato from "./Giochi/ImpiccatoGame/Javascript/Impiccato.js"
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Dashboard from "./components/Dashboard.js";
import Quiz from "./Giochi/Quiz.js";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/Homepage" index element={<Homepage />} />
          <Route path="/Homepage/Giochi" element={<Giochi />} />
          <Route path="/components/Login" element={<Login />} />
          <Route path="/Homepage/Curiosita" element={<Curiosita />} />
          <Route path="/Homepage/Comunita" element={<Comunita />} />
          <Route path="/Giochi/Notizie" element={<Notizie/>}/>
          <Route path="/Giochi/Video" element={<Video />} />
          <Route path="/Giochi/Impiccato" element={<Impiccato />} />
          <Route path="/components/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Giochi/Quiz" element={<Quiz />} />
          <Route path="/Giochi/ImpiccatoGame/Javascript/Impiccato" element={<Impiccato/>} />
        </Routes>
      </div>

    </>

  );
}

export default App;
/*
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
 
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Navbar/>
          <Dashboard/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
 
export default App;*/