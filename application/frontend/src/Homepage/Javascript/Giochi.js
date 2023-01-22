import React, { Component, withRouter } from "react";
//import './withRouter.js';
import { Link } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../buttons.css'
import impiccatoImage from '../Immagini/impiccato.png'
import quizImage from '../Immagini/quizImage.jpg'


//class Homepage extends Component {
const Giochi = () => {

  return (
    <>

      <br></br>
      <div class="album py-5 bg-light">
        <div class="container">

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col">
              <div class="card shadow-sm">
                <img src={quizImage} width="100%" height="225"></img>
                <div class="card-body">
                  
                  <p class="card-text">Quiz e indovinelli sul mondo animale. In bocca al lupo!</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    <Link to='../../Giochi/Quiz/QuizPage'><button type="button" class="c3-play">Gioca</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <img src={impiccatoImage} width="100%" height="225"></img>
                <div class="card-body">
                  <p class="card-text">Il classico gioco dell'impiccato relativo agli animali!</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    <Link to='../../Giochi/Impiccato/ImpiccatoPage'><button type="button" class="c3-play">Gioca</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <img src="cheAnimale.jpg" width="100%" height="225"></img>
                <div class="card-body">
                  <p class="card-text">Che animale sei? Rispondi a qualche semplice domanda per scoprire che animale ti
                    rappresenta meglio</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="start">Gioca</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}


export default Giochi;