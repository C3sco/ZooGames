import React from "react";
import { Link } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../buttons.css'
import impiccatoImage from '../Immagini/impiccato.png'
import quizImage from '../Immagini/quizImage.jpg'
import videoImage from '../Immagini/funnyCat.jpg'

export default function Homepage() {

  return (<>
  <br></br>
  <div className="wrapper">
    <div className="bg">BENVENUTO SU ZOOGAMES!</div>
  </div>
    <br></br>
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col">
          <div class="card shadow-sm">
            <img src={quizImage} width="100%" height="225"></img>
            <div class="card-body">
              <p class="card-text">Quiz e indovinelli sul mondo animale. In bocca al lupo!</p>
              <div class="btn-group">
                <Link to='../../Giochi/Quiz/QuizPage'><button type="button" class="c3-play">Gioca</button></Link>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <img src={impiccatoImage} width="100%" height="225"></img>
            <div class="card-body">
              <p class="card-text">Il classico gioco dell'impiccato relativo agli animali!</p>
              <div class="btn-group">
                <Link to='../../Giochi/Impiccato/ImpiccatoPage'><button type="button" class="c3-play">Gioca</button></Link>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <img src={videoImage} width="100%" height="225"></img>
            <div class="card-body">
              <p class="card-text">Video divertenti e buffi sugli animali. Dacci un'occhiata!</p>
              <div class="btn-group">
                <Link to='../../Giochi/Impiccato/ImpiccatoPage'><button type="button" class="c3-play">Scopri</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br></br><br></br><br></br>
    <p className='footer'>Sito creato da </p>


  </>
  )
}
