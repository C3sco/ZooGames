import React from "react";
import './App.css';
import './App.js';
import { Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage.js'
import Navbar from './components/Navbar.js'
import Notizie from "./Giochi/Notizie.js"
import Video from "./Giochi/Video.js"
import ImpiccatoPage from "./Giochi/Impiccato/ImpiccatoPage.js"
import Dashboard from "./userPages/Dashboard.js";
import LoginSupabase from "./components/LoginSupabase.js";
// import Register from "./components/Register.js"
import { supabase } from "./components/Database.js";
import { useState, useEffect } from 'react'
import QuizPage from "./Giochi/Quiz/QuizPage.js";
import AdminPage from "./components/AdminPage.js";
import AdminNavbar from "./components/AdminNavbar.js";
import Leaderboard from "./userPages/Leaderboard.js";
import Shop from "./userPages/Shop.js";
import AdminShop from "./components/AdminShop.js";
import Forum from "./userPages/Forum.js";
import CreatePost from "./userPages/CreatePost.js";
import Checkout from "./userPages/Checkout.js";
import AdminForum from "./components/AdminForum.js";

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [session, setSession] = useState(null)
  try {
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        getAdmin();
      })
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

    }, [])

  } catch (err) {
    console.log(err);
  }

  let cart ='';

  async function getAdmin() {
    if (session != null) {
      try {
        const adminN = await supabase.from('users').select('admin').eq('id', session.user.id)
        // check se l'utente è admin
        if (adminN.data[0].admin === 1) {
          setIsAdmin(true);
          console.log("Benvenuto Admin!")
        } else {
          setIsAdmin(false);
          console.log("Non sei un admin!")
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>

      {isAdmin ? <AdminNavbar /> : <Navbar />}


      <div>

        <div className="container">
          <Routes>
            <Route path="/" index element={<Homepage />} />
            <Route path="/Giochi/Notizie" element={<Notizie />} />
            <Route path="/Giochi/Video" element={<Video />} />
            <Route path="/Giochi/Impiccato/ImpiccatoPage" element={<ImpiccatoPage session={session} />} />
            <Route path="/userPages/Dashboard" element={<Dashboard />} />
            <Route path="/Giochi/Quiz/QuizPage" element={<QuizPage session={session} />} />

            <Route path="/components/AdminShop" element={!session ? <LoginSupabase /> : <AdminShop key={session.user.id} session={session} />} />
            <Route path="/components/AdminPage" element={!session ? <LoginSupabase /> : <AdminPage key={session.user.id} session={session} />} />
            <Route path="/components/AdminForum" element={!session ? <LoginSupabase /> : <AdminForum key={session.user.id} session={session} />} />
            <Route path="/components/LoginSupabase" element={!session ? <LoginSupabase /> : <Dashboard key={session.user.id} session={session} />} />


            <Route path="userPages/Leaderboard" element={!session ? <LoginSupabase /> : <Leaderboard key={session.user.id} session={session} />} />
            <Route path="userPages/Shop" element={!session ? <LoginSupabase /> : <Shop key={session.user.id} session={session} />} />
            <Route path="/userPages/Forum" element={!session ? <LoginSupabase /> : <Forum key={session.user.id} session={session} />} />
            <Route path="/userPages/CreatePost" element={!session ? <LoginSupabase /> : <CreatePost key={session.user.id} session={session} />} />
            <Route path="/userPages/Checkout" element={!session ? <LoginSupabase /> : <Checkout key={session.user.id} session={session} />} />
            
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;