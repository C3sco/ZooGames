import React from 'react'
import { Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from './Auth.js'
import Auth from './Auth.js'

export function PrivateRoute({ component: Component, ...rest }) {
  /*
  const navigate = useNavigate();
    
  const auth = Auth.getInstance();

  return (
    <Route
      {...rest}
      render={(props) => {
        // Renders the page only if `user` is present (user is authenticated)
        // Otherwise, redirect to the login page
        return user ? <Component {...props} /> : <Navigate to="/login" />
      }}
    ></Route>
  )*/
}