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
import Dashboard from "./userPages/Dashboard.js";
import Quiz from "./Giochi/Quiz.js";
import LoginSupabase from "./components/LoginSupabase.js";

import { supabase } from "./components/Database.js";
import { useState, useEffect } from 'react'
import QuizFinal from "./Giochi/Quiz/QuizFinal.js";
import AdminPage from "./components/AdminPage.js";
import AdminNavbar from "./components/AdminNavbar.js";


function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [session, setSession] = useState(null)
  try {
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

  } catch (err) {
    console.log(err);
  }
  try {
    useEffect(() => {
      // check if the user is logged in
      if (supabase.auth.currentUser()) {
        // check if the user has the necessary role
        if (supabase.auth.currentUser().role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    }, [supabase.auth.currentUser()]);

  } catch (err) {
    console.log(err);
  }
  return (
    <>

      {isAdmin ? <AdminNavbar /> : <AdminNavbar />}


      <div>



        <div className="container">
          <Routes>
            <Route path="/Homepage" index element={<Homepage />} />
            <Route path="/Homepage/Giochi" element={<Giochi />} />
            <Route path="/Homepage/Curiosita" element={<Curiosita />} />
            <Route path="/Homepage/Comunita" element={<Comunita />} />
            <Route path="/Giochi/Notizie" element={<Notizie />} />
            <Route path="/Giochi/Video" element={<Video />} />
            <Route path="/Giochi/Impiccato" element={<Impiccato />} />
            <Route path="/Giochi/Quiz" element={<Quiz />} />
            <Route path="/Giochi/ImpiccatoGame/Javascript/Impiccato" element={<Impiccato />} />
            <Route path="/userPages/Dashboard" element={<Dashboard />} />
            <Route path="/Giochi/Quiz/QuizFinal" element={<QuizFinal />} />



            <Route path="/components/AdminPage" element={!session ? <LoginSupabase /> : <AdminPage key={session.user.id} session={session} />} />

            <Route path="/components/LoginSupabase" element={!session ? <LoginSupabase /> : <Dashboard key={session.user.id} session={session} />} />
          </Routes>
        </div>
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

{ !session ? <LoginSupabase /> : <Dashboard key={session.user.id} session={session} />}

<Route path="/userPages" element={<PrivateRoute/>}>
            <Route path="/userPages">
              

              </Route>
          </Route>
<Route path="/userPages/Dashboard" element={<Dashboard/>}/>


 
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