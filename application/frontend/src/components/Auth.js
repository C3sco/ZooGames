import React, { useContext, useState, useEffect } from 'react'
import { supabase } from './Database.js'

export default class Auth {

  static myInstance = null;
  authenticated = false;
  id = 0;
  userEmail = null;
  role = null;

  // Restore from localStorage    
  constructor() {
      if(window.localStorage.getItem("authenticator")) {
          this.authenticated = window.localStorage.getItem("authenticated");
          this.id = window.localStorage.getItem("authenticator");
          this.userEmail = window.localStorage.getItem("user_email");
          this.role = window.localStorage.getItem("user_role");
      }
  }

  static getInstance() {
      if( !Auth.myInstance ) {
          Auth.myInstance = new Auth();

          // For debug purpose
          this.id += 1;
      
      }

      return this.myInstance;
  }

  login(userEmail, userRole) {
      this.authenticated = true;
      this.userEmail = userEmail;
      this.role = userRole;
      window.localStorage.setItem("authenticator", this.id);
      window.localStorage.setItem("user_email", this.userEmail);
      window.localStorage.setItem("authenticated", this.authenticated);
      window.localStorage.setItem("user_role", this.role);
  }

  logout(callback) {
      this.authenticated = false;
      this.userEmail = null;
      window.localStorage.removeItem("authenticator");
      window.localStorage.removeItem("user_email");
      window.localStorage.removeItem("authenticated");
      window.localStorage.removeItem("user_role");
  }

  isAuthenticated() { return this.authenticated; }

}


/*
const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      // Check active sessions and sets the user
      const session = supabase.auth.session()
  
      setUser(session?.user ?? null)
      setLoading(false)
  
      // Listen for changes on auth state (logged in, signed out, etc.)
      const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })
  
      return () => {
        listener?.unsubscribe()
      }
    }, [])
  
    // Will be passed down to Signup, Login and Dashboard components
    const value = {
      signUp: (data) => supabase.auth.signUp(data),
      signIn: (data) => supabase.auth.signIn(data),
      signOut: () => supabase.auth.signOut(),
      user,
    }
  
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  }

  export function useAuth() {
    return useContext(AuthContext)
  }*/