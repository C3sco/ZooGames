import React, { Component, withRouter } from "react";
import "./Style/carousel.css";
import "../style.css";
import { Link } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';




const Home = () => {

  return (
    <>
      <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/album/"></link>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
      <link rel="stylesheet" href="carousel.css"></link>

      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></li>
          <li data-target="#myCarousel" data-slide-to="1" aria-label="Slide 2"></li>
          <li data-target="#myCarousel" data-slide-to="2" aria-label="Slide 3"></li>
        </ol>

        <div class="carousel-inner">

          <div class="carousel-item active">
            <img src={require("./Immagini/games3.png")} class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" alt="" preserveAspectRatio="xMidYMid slice" focusable="false"></img>
            <div class="container">
              <div class="carousel-caption text-start">
                <h1>Giochi</h1>
                <p>Alcuni giochi sugli animali con cui divertirsi</p>
                <p><a class="btn btn-lg btn-primary" href="giochi.html">Giochiamo!</a></p>
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <img src={require("./Immagini/bg.jpg")} class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" alt="" preserveAspectRatio="xMidYMid slice" focusable="false"></img>
            <div class="container">
              <div class="carousel-caption">
                <h1>Curiosità</h1>
                <p>Alcune curiosità, immagini e video divertenti sugli animali</p>
                <p><a class="btn btn-lg btn-primary" href="curiosita.html">Dimmi di più!</a></p>
              </div>
            </div>
          </div>

   

        </div>
        
        <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </>
  )
}
/*<div class="container">
                <div class="carousel-caption text-start">
                  <h1>Giochi</h1>
                  <p>Alcuni giochi sugli animali con cui divertirsi</p>
                  <p><a class="btn btn-lg btn-primary" href="giochi.html">Giochiamo!</a></p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img src="bg.jpg" class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></img>

              <div class="container">
                <div class="carousel-caption">
                  <h1 style="color:red; font-size:40px">Curiosità</h1>
                  <p style="color:red; font-size:30px">Alcune curiosità, immagini e video divertenti sugli animali</p>
                  <p><a class="btn btn-lg btn-primary" href="curiosita.html">Dimmi di più!</a></p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg>

              <div class="container">
                <div class="carousel-caption text-end">
                  <h1>One more for good measure.</h1>
                  <p>Some representative placeholder content for the third slide of this carousel.</p>
                  <p><a class="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
                </div>
              </div>









                     <div class="carousel-item">
            <img src={require("./games3.png")} class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" alt="" preserveAspectRatio="xMidYMid slice" focusable="false"></img>
            <div class="container">
              <div class="carousel-caption text-end">
                <h1>One more for good measure.</h1>
                <p>Some representative placeholder content for the third slide of this carousel.</p>
                <p><a class="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
              </div>
            </div>
          </div>
              */

export default Home;