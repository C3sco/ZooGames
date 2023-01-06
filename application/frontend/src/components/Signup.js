import { useNavigate, Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useAuth } from './Auth.js'

export default async function Signup() {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    },
        {
            data: {
                username
            }
        });
    if (error) {
        setRMsg(error.message)
    } else {
        setRMsg('User created successfully')
        setUser(data.user)
    }
    return (
        <div className="App">
            <h1>Register User</h1>
            email:<input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /><br />
            Password:<input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" /><br />
            username:<input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" /><br />
            <button onClick={Register}>Register</button><br></br>
        </div>

    )
}



/*
export function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()

  // Get signUp function from the auth context
  const { signUp } = useAuth()

  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current.value
    const password = passwordRef.current.value

    // Calls `signUp` function from the context
    const { error } = await signUp({ email, password })

    if (error) {
      alert('error signing in')
    } else {
      // Redirect user to Dashboard
      history.push('/')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Sign up</button>
      </form>
    </>
  )
}


/*

import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();
   
 
    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            history.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Register

*/