import { useState } from 'react'
import { supabase } from './Database.js'


export default function LoginSupabase() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email,
        
        options: {
          emailRedirectTo: 'http://localhost:3000/components/LoginSupabase',
        }, })
      if (error) throw error
      alert('Perfavore conferma il tuo account tramite il link che hai ricevuto per mail!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">LOGIN ZOOGAMES</h1>
        <p className="description">Perfavore inserisci la tua mail per continuare, ti verrà inviato un link per poter confermare il tuo accountcd</p>
        {loading ? (
          'Sending magic link...'
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email </label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}