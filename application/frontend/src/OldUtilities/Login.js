import { useState } from 'react';
import './Style/login.css'
import { LoginHelper } from './LoginHelper';
import { ReigsterHandler } from './RegisterHandler';
//import * as fs from 'fs';
import utenti from '../JSON/utenti.json';
import {loadJSON} from '../JsonReader';

import AuthService from "./services/auth.service";

import Login from "../components/login.component";
import Register from "../components/register.component";
import Home from "../components/home.component";
import Profile from "../components/profile.component";
import BoardUser from "../components/board-user.component";
import BoardModerator from "../components/board-moderator.component";
import BoardAdmin from "../components/board-admin.component";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

const start = () => {

    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  

  componentDidMount(); {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount(); {
    EventBus.remove("logout");
  }

  logOut(); {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }






    /*
    //const dataJson = utenti.map((utenti));
    const getDati=()=>{
        fetch('utenti.json'
        ,{

            headers : { 
      
              'Content-Type': 'application/json',
      
              'Accept': 'application/json'
      
             }
      
          })
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmit(false);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmit(false);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmit(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || password === '' || email === '') {
            setError(true);
        } else {
            setSubmit(true);
            setError(false);
        }
    }

    if (submit == true) {
        // ReigsterHandler(username);
        let datiUser = {
            username: username,
            password: password
        }

        //getDati.push(datiUser)

        //saveJSON('users.json', getDati)
        
    }

    function saveJSON(filename = '', json = '""') {
        return fs.writeFileSync(filename, JSON.stringify(json))
    }
    const fs = require('fs');
    

    

    const onSuccess = () => {
        return (
            //inserire la homepage utente
            <>
            </>
        )
    }

    const onError = () => {
        //errore
        return (
            <>
            </>
        )
    }

   //const datiJSON = loadJSON('../JSON/utenti.json');



    return (
        <html>

            <div className="messages">
                {onError()}
                {onSuccess()}
            </div>
            <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/album/"></link>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
                integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                crossorigin="anonymous"></script>
            <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
            <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
            <main class="flex-shrink-0">
                <div class="container">
                    <div class="col-md-6 mx-auto p-0">
                        <div class="login-box">
                            <div class="login-snip"> <input id="tab-1" type="radio" name="tab" class="sign-in" checked></input><label for="tab-1" class="tab">Login</label> <input id="tab-2" type="radio" name="tab" class="sign-up"></input><label for="tab-2" class="tab">Registrati</label>
                                <div class="login-space">
                                    <div class="login">
                                        <div class="group"> <label for="user" class="label">Username</label> <input id="user" type="text" class="input" placeholder="Inserisci il tuo Username"></input> </div>
                                        <div class="group"> <label for="pass" class="label">Password</label> <input id="pass" type="password" class="input" data-type="password" placeholder="Inserisci la tua password"></input> </div>
                                        <div class="group"> <input id="check" type="checkbox" class="check" checked></input> <label for="check"><span class="icon"></span> Mantienimi connesso</label> </div>
                                        <div class="group"> <input type="submit" class="button" value="Login" id="myButton"></input> </div>
                                        <div class="foot"> <a href="#">Password dimenticata?</a> </div>
                                    </div>
                                    <div class="sign-up-form">
                                        <div class="group"> <label for="user" class="label">Username</label> <input onChange={handleUsername} value={username} id="userRegister" type="text" class="input" placeholder="Crea un Username"></input></div>
                                        <div class="group"> <label for="pass" class="label">Password</label> <input onChange={handlePassword} value={password} id="passRegister" type="password" class="input" data-type="password" placeholder="Inserisci una password"></input> </div>
                                        <div class="group"> <label for="pass" class="label">Ripeti Password</label> <input id="pass" type="password" class="input" data-type="password" placeholder="Ripeti la password"></input> </div>
                                        <div class="group"> <label for="pass" class="label">Indirizzo email</label> <input onChange={handleEmail} value={email} id="passRegister" type="text" class="input" placeholder="Inserisci la tua email"></input> </div>
                                        <div class="group"> <input onClick={handleSubmit} type="submit" class="button" value="Sign Up" ></input> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sign-up-form">
                                        <div class="group"> <label for="user" class="label">Username</label> <input onChange={handleUsername} value={username} id="userRegister" type="text" class="input" placeholder="Crea un Username"></input></div>
                                        <div class="group"> <label for="pass" class="label">Password</label> <input onChange={handlePassword} value={password} id="passRegister" type="password" class="input" data-type="password" placeholder="Inserisci una password"></input> </div>
                                        <div class="group"> <label for="pass" class="label">Ripeti Password</label> <input id="pass" type="password" class="input" data-type="password" placeholder="Ripeti la password"></input> </div>
                                        <div class="group"> <label for="pass" class="label">Indirizzo email</label> <input onChange={handleEmail} value={email} id="passRegister" type="text" class="input" placeholder="Inserisci la tua email"></input> </div>
                                        <div class="group"> <input onClick={handleSubmit} type="submit" class="button" value="Sign Up" ></input> </div>
                                    </div>
                </div>
            </main>

        </html>
    )
}*/
export default Login