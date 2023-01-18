import React from "react";
import './App.css';
import './App.js';
import { Routes, Route } from "react-router-dom";
import Homepage from './Homepage/Javascript/Homepage.js'
import Giochi from './Homepage/Javascript/Giochi.js'
import Curiosita from './Homepage/Javascript/Curiosita.js'
import Navbar from './components/Navbar.js'
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
import Leaderboard from "./userPages/Leaderboard.js";
import Shop from "./userPages/Shop.js";
import AdminShop from "./components/AdminShop.js";
import Forum from "./userPages/Forum.js";
import CreatePost from "./userPages/CreatePost.js";


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
  // try {
  //   useEffect(() => {
  //     // check if the user is logged in
  //     if (supabase.auth.currentUser()) {
  //       // check if the user has the necessary role
  //       if (supabase.auth.currentUser().role === 'admin') {
  //         setIsAdmin(true);
  //       } else {
  //         setIsAdmin(false);
  //       }
  //     }
  //   }, [supabase.auth.currentUser()]);

  // } catch (err) {
  //   console.log(err);
  // }
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
            <Route path="/Giochi/ImpiccatoGame/Javascript/Impiccato" element={!session ? <LoginSupabase /> : <Impiccato key={session.user.id} session={session} />} />
            <Route path="/userPages/Dashboard" element={<Dashboard />} />
            <Route path="/Giochi/Quiz/QuizFinal" element={<QuizFinal />} />
            <Route path="userPages/Leaderboard" element={!session ? <LoginSupabase /> : <Leaderboard key={session.user.id} session={session} />} />
            <Route path="userPages/Shop" element={!session ? <LoginSupabase /> : <Shop key={session.user.id} session={session} />} />
            <Route path="/userPages/Forum" element={!session ? <LoginSupabase /> : <Forum key={session.user.id} session={session} />} />
            <Route path="/userPages/CreatePost" element={!session ? <LoginSupabase /> : <CreatePost key={session.user.id} session={session} />} />

            <Route path="/components/AdminShop" element={!session ? <LoginSupabase /> : <AdminShop key={session.user.id} session={session} />} />
            <Route path="/components/AdminPage" element={!session ? <LoginSupabase /> : <AdminPage key={session.user.id} session={session} />} />
            <Route path="/components/LoginSupabase" element={!session ? <LoginSupabase /> : <Dashboard key={session.user.id} session={session} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;