import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../components/Auth.js'
import { supabase } from '../components/Database.js';
import ProfileImage from './ProfileImage.js';

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
  const [website, setWebsite] = useState(null)
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
        .select(`email`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        //setWebsite(data.website)
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
        //website,
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
    <div aria-live="polite">
      {loading ? (
        'Saving ...'
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <ProfileImage /* Richiama la classe ProfileImage in cui c'è il return del form, quindi bisogna modificare l'html di quello */
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateProfile({ username, website, avatar_url: url })
            }}
          />
          <br></br>

          <div>Email: {session.user.email}</div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <button className="button primary block" disabled={loading}>
              Aggiorna Profilo
            </button>
          </div>
        </form>
      )}
      <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard;


/* <div>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="url"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          */