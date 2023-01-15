import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../components/Database.js';
import ProfileImage from './ProfileImage.js';

import './dashboard.css'

/* 
Questa è la schermata che appare all'utente una volta loggato.
Bisogna sistemare l'html in modo da renderla un po' più bella, il js funziona.
Ci sono delle textbox in cui puoi scrivere le solite cose da modificare (username)
C'è la possibilità di mettere un immagine profilo però non è ancora collegata al db quella quindi non si vede però
ho già setuppato il label in cui uscirà.
Bisogna aggiungere le textbox per nome, cognome e data di nascita.

*/



const Dashboard = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)
  const [birthday, setBirthday] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const { user } = session

      let { data, error, status } = await supabase
        .from('users')
        .select(`*`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setName(data.name)
        setSurname(data.surname)
        setBirthday(data.birthday)
        //setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user.id,
        username,
        name,
        surname,
        birthday,
        //avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('users').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div  aria-live="polite">
      {loading ? (
        'Saving ...'
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <ProfileImage /* Richiama la classe ProfileImage in cui c'è il return del form, quindi bisogna modificare l'html di quello */
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateProfile({ username, name, surname, birthday })
            }}
          />
          <br></br>

          <div >Email: {session.user.email}</div>
          <br></br>
          <label for="name">Nome:</label><br/>
          <input type="text" id="name" name="name" value={name || ''}
              onChange={(e) => setName(e.target.value)}/><br/>
          <label for="surname">Cognome:</label><br/>
          <input type="text" id="surname" name="surname"  value={surname || ''}
              onChange={(e) => setSurname(e.target.value)}/><br/>
          <label for="username">Username:</label><br/>
          <input id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            /><br/>
          <label class='lbl' for="dob">Data di nascita:</label><br/>
          <input type="date" id="dob" name="dob" value={birthday || ''}
              onChange={(e) => setBirthday(e.target.value)}/><br/><br/>          
          <div>
            <button className="btn" disabled={loading}>
              Aggiorna Informazioni
            </button>
          </div>
        </form>
      )}
      <br></br>
      <button type="button" className="btn" onClick={() => supabase.auth.signOut()}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard;