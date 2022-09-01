import React from "react";
import { useEffect, useState } from "react";
import { useStateWithCallback } from "../../hooks/useStateWithCallback";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import "../../css/hangman.css";

const Hangman = () => {

    const [randomWord, setRandomWord] = useState();

    const [gameState, setGameState] = useStateWithCallback(0);

    const [userGuess, setUserGuess] = useStateWithCallback({arr: []});

    const [guestUsername, setGuestUsername] = useState('');

    const [numberCorrectGuess, setNumberCorrectGuess] = useState(0);

    const alphabet = Array.from(Array(26))
                            .map((e, i) => i + 65)
                            .map((x) => String.fromCharCode(x));

    useEffect(() => {
        getRandomWord();    
    }, []);

    useEffect(() => {
        if(randomWord) {
            const rootDiv = document.getElementById("guess-word-div");
            let vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"];
            for(let i = 0; i < randomWord.length; i++) {
                let div = document.createElement("div");
                let input = document.createElement("input");
                let p = document.createElement("p");
                
                div.classList.add("p-2");
                
                input.type = "text";
                input.readOnly = true;
                input.style.textTransform = "uppercase";

                input.classList.add("form-control");
                input.classList.add("form-control-lg");
                input.classList.add("input-hangman");
                input.name = i;

                p.classList.add("fw-bold");
                p.classList.add("display-6");

                if(randomWord[i] != ' ' && vowels.includes(randomWord[i])) {
                    p.innerHTML = '+';
                    
                } else if(randomWord[i] == ' ') {
                    input.disabled = "true";
                    p.innerHTML = 's'
                    p.style.color = "white";
                    let clonedArr = userGuess.arr.slice();
                    clonedArr[i] = " ";
                    setUserGuess({arr: clonedArr});
                
                } else {
                    p.innerHTML = '-';
                }

                div.appendChild(input);
                div.appendChild(p);
                rootDiv.appendChild(div);

            }
        }
    }, [randomWord])

    const getRandomWord = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/animals/rand");
            setRandomWord(response.data);
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            }
        }
    }

    const handleLetterClick = ({target: btn}) => {

        let atLeastOneGuessed = false;
        let clonedArr = userGuess.arr.slice(); 

        for(let i = 0; i < randomWord.length; i++) {
            if(randomWord[i].toUpperCase() == btn.value.toUpperCase()) {
                atLeastOneGuessed = true;
                setNumberCorrectGuess(numberCorrectGuess + 1);

                let inputToSet = document.getElementsByTagName("input")[i];
                inputToSet.value = btn.value.toUpperCase();
                btn.innerHTML = `<s>${btn.value}</s>`;
                btn.disabled = true;

                clonedArr[i] = btn.value.toUpperCase();

                setUserGuess({arr: clonedArr}, (prevValue, newValue) => {
                    clonedArr = newValue.arr.slice();
                    checkWin(newValue);
                });
            }
        }

        if(!atLeastOneGuessed) {
            btn.disabled = true;
            btn.innerHTML = `<s>${btn.value}</s>`;   
            
            setGameState(gameState + 1, (prevValue, newValue) => {
                document.getElementById("hangman-state").src = require(`../../assets/hangman-states/${newValue}.png`);
                
                if(newValue === 6) {
                    let points =  numberCorrectGuess * 5;
                    
                    toast.info("You got: " + points + " points");
                    toast.error("YOU LOST! the word was: " + randomWord);
                    
                    reset();
                    postStats(points);
                }
            });
        }
    }

    const checkWin = (guessWord) => {
        if(guessWord.arr.join("").toUpperCase() == randomWord.toUpperCase()) {
            toast.success("WINNER! the word was: " + randomWord);

            let errors = gameState;
            let points = 100 - errors * 10;
            toast.info("You got: " + points + " points");
            reset();
            postStats(points);
        }
    }

    const reset = () => {
        const rootDiv = document.getElementById("right-div");
        rootDiv.innerHTML = '';

        let playAgainBtn = document.createElement("button");
        playAgainBtn.classList.add("btn");
        playAgainBtn.classList.add("btn-outline-secondary");
        playAgainBtn.classList.add("btn-lg");
        playAgainBtn.classList.add("my-3");
        playAgainBtn.onclick = () => {
            window.location.href = window.location.href;
        }
        playAgainBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';

        let goBackBtn = document.createElement("a");
        goBackBtn.classList.add("btn");
        goBackBtn.classList.add("btn-outline-secondary");
        goBackBtn.classList.add("btn-lg");
        goBackBtn.classList.add("my-3");
        goBackBtn.href = "/gamePage";
        goBackBtn.innerHTML = '<i class="bi bi-house"></i>';

        rootDiv.appendChild(playAgainBtn);
        rootDiv.appendChild(goBackBtn);
    }

    const handleGuestUserChange = ({target: input}) => {
        setGuestUsername(input.value);
    }

    const postStats = async (points) => {
        if(window.localStorage.getItem("authenticator") || guestUsername != '') {
            let userIdentifier = window.localStorage.getItem("user_email") || guestUsername + " (guest)";
            let body = {
                userId: userIdentifier,
                points: points,
                gameName: 'hangman'
            }
            try {
                const response = await axios.post("http://localhost:8080/api/scores", body);
                toast.success(response.data.message); 
            } catch (error) {
                toast.error(error.data.message);
            }
        }
    }

    return(
        <div className="container-fluid text-center position-relative">
            <ToastContainer />
            <p className="display-4"><b>hangman.</b> guess or die</p>
            {
                !window.localStorage.getItem("authenticator") 
                    && guestUsername == ''
                    &&
                        <button 
                            className="position-absolute mt-3 me-3 top-0 end-0 btn btn-outline-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#guestInfoModal"
                        >
                            add info
                        </button>
            }
            <div className="row mx-2 mt-5"> 
                <div className="col-lg-5 bg-primary rounded-3 p-2">
                    <img id="hangman-state" src={require('../../assets/hangman-states/0.png')} className="img-fluid hangman-img"></img>
                </div>
                <div className="col-lg-7 d-flex flex-column align-items-center justify-content-center" id="right-div">
                    <div id="guess-word-div" className="d-flex align-items-center justify-content-center flex-wrap">

                    </div>
                </div>
                <div className="container keyboard-container">
                    <div id="alphabet" className="d-flex align-items-center flex-wrap justify-content-center mt-3">
                        {
                            alphabet.map((e) => (
                                <button key={e} className="btn btn-lg btn-outline-secondary my-2 mx-2 fw-bold letter-button" onClick={handleLetterClick} value={e}>
                                    {e}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
            
            {/* Guest user modal */}
            <div className="modal fade" id="guestInfoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Guest info</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Help us to save your performance: choose a username</p>
                            <p>or</p>
                            <p><a href="/signIn">sign in</a></p>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="guestUsername"
                                    className="form-control"
                                    placeholder="(guest)"
                                    autoComplete="off"
                                    onChange={handleGuestUserChange}
                                    required
                                />
                                <label htmlFor="guestUsername">(guest)</label>
                            </div>
                            <button
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                                onClick={(e) => {e.preventDefault(); toast.success("your guest username is: " + guestUsername)}}
                            >
                                confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hangman;