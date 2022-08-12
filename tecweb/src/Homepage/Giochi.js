import React, {Component,withRouter} from "react";
//import './withRouter.js';
import {Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


//class Homepage extends Component {
const Giochi = () => {

        return (
          <>
          <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/sticky-footer-navbar/"></link>

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

  <br></br>
  <div class="album py-5 bg-light">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col">
          <div class="card shadow-sm">
            <img src="quiz.png" width="100%" height="225"></img>
            <div class="card-body">
              <p class="card-text">Quiz e indovinelli sul mondo animale. In bocca al lupo!</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="start">Gioca</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow-sm">
            <img src="/impiccato.png" width="100%" height="225"></img>
            <div class="card-body">
              <p class="card-text">Il classico gioco dell'impiccato relativo agli animali!</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="start">Gioca</button>
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