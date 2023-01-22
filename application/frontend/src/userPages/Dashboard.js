import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../components/Database.js';
import ProfileImage from './ProfileImage.js';
import './dashboard.css'
import '../buttons.css'

/* 
Questa è la schermata che appare all'utente una volta loggato.
Bisogna sistemare l'html in modo da renderla un po' più bella, il js funziona.
Sistemare lo score e l'avatar
*/

const Dashboard = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)
  const [birthday, setBirthday] = useState(null)
  const [image, setImage] = useState(null)
  const [score, setScore] = useState(null)

  const id = session.user.id

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
        setImage(data.image)
        setScore(data.score)
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
        image,
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
        'Caricamento ...'
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <ProfileImage /* Richiama la classe ProfileImage in cui c'è il return del form, quindi bisogna modificare l'html di quello */
            url={image}
            id = {id}
            size={200}
            onUpload={(url) => {
            setImage(url)
            updateProfile()
            }}
          />
          <br></br>

          <div style={{fontSize:20}}><b>Email: </b> <i>{session.user.email}</i><br></br>
          <b>Punteggio:</b> {score}</div>
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
            <button className="c3-succ" disabled={loading}>
              Aggiorna Informazioni
            </button>
            <button type="button" className="c3-err" onClick={() => supabase.auth.signOut()}>
        Logout
      </button>
          </div>
        </form>
      )}
      <br></br>
      <br></br>
      
    </div>
  )
}

export default Dashboard;