import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../components/Database.js';
import ProfileImage from './ProfileImage.js';
import './dashboard.css'
import '../buttons.css'
import Loading from '../components/Loading.js';

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
  const [adminUpdate, setAdminUpdate] = useState('');
  const [adminRemove, setAdminRemove] = useState('');
  
  const id = session.user.id
  console.log(id);

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

  const updateAdmin = async (userId, role) => {
    try {
      const response = await supabase.from('users').update({ admin: role }).eq('id', userId);
      console.log(response);
      setAdminUpdate('Utente [ ' + username + ' ] reso admin con successo! Ricarica la pagina per vedere i cambiamenti');
    } catch (error) {
      console.error(error);
    }
    console.log(session.user.id)
  }
  const removeAdmin = async (userId, role) => {
    try {
        const response = await supabase.from('users').update({ admin: role }).eq('id', userId);
        console.log(response);
        setAdminRemove('Utente [ ' + username + ' ] non più admin, ricarica la pagina per vedere i cambiamenti');
    } catch (error) {
        console.error(error);
    }
}
  setTimeout(() => setAdminUpdate(''), 5000)
  setTimeout(() => setAdminRemove(''), 5000)

  return (
    <div aria-live="polite">
      {loading ? (
        <Loading />
      ) : (

        <form onSubmit={updateProfile} className="form-widget">
          <div className='cart' style={{ textAlign:'center'}}>
          <h4>Pulsanti per poter testare le pagine admin</h4>
          <button className='c3-succ' onClick={() => updateAdmin(session.user.id, '1')}>Set Admin</button>
          <button className='c3-err' onClick={() => removeAdmin(session.user.id, '0')}>Remove Admin</button>
          {adminUpdate && <div className="text-success">{adminUpdate}</div>}
          {adminRemove && <div className="text-danger">{adminRemove}</div>}
          </div>
          <ProfileImage
            url={image}
            id={id}
            size={200}
            onUpload={(url) => {
              setImage(url)
              updateProfile()
            }}
          />
          <br></br>

          <div style={{ fontSize: 20 }}><b>Email: </b> <i>{session.user.email}</i><br></br>
            <b>Punteggio:</b> {score}</div>
          <br></br>
          <label for="name">Nome:</label><br />
          <input type="text" id="name" name="name" value={name || ''}
            onChange={(e) => setName(e.target.value)} /><br />
          <label for="surname">Cognome:</label><br />
          <input type="text" id="surname" name="surname" value={surname || ''}
            onChange={(e) => setSurname(e.target.value)} /><br />
          <label for="username">Username:</label><br />
          <input id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <label class='lbl' for="dob">Data di nascita:</label><br />
          <input type="date" id="dob" name="dob" value={birthday || ''}
            onChange={(e) => setBirthday(e.target.value)} /><br /><br />
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