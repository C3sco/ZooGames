import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./quizStyle.css";

const Quiz = () => {
    const question = document.getElementById("question");
    const choices = Array.from(document.getElementsByClassName('choice-text'));
    const progressText = document.getElementById('progressText');
    const progressBarFull = document.getElementById('progressBarFull');
    const scoreText = document.getElementById('score');
    const loader = document.getElementById('loader');
    const game = document.getElementById('game');


    let acceptingAnswers = true;
    let currentQuestion = {};
    let score = 0;
    let questions = [];
    let questionCounter = 0;
    let availableQuestions = [];

    const CORRECT_BONUS = 10;
    const MAX_QUESTIONS = 3;

    const startGame = () => {
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        console.log(availableQuestions);
        getNewQuestion()
        //game.classList.remove('hidden');
        //loader.classList.add('hidden');
    }

    const getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score);
            //go to the end page
            return window.location.assign('/end.html');
        }
        questionCounter++;
        progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
        //Update the progress bar
        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerHTML = currentQuestion.question;

        choices.forEach((choice) => {
            const number = choice.dataset['number'];
            choice.innerHTML = currentQuestion['choice' + number];
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
    };

    const incrementScore = (num) => {
        score += num;
        scoreText.innerText = score;
    };

    choices.forEach((choice) => {
        choice.addEventListener('click', (e) => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            const classToApply =
                selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if (classToApply === 'correct') {
                incrementScore(CORRECT_BONUS);
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        });
    });

    fetch('https://opentdb.com/api.php?amount=10&category=27')
        .then(res => {
            return res.json();
        })/*
        .then(loadedQuestions => {
            console.log(loadedQuestions.results);
            questions = loadedQuestions.results.map(loadedQuestions => {
                const formattedQuestion = {
                    question: loadedQuestions.question
                };

                const answerChoices = [...loadedQuestion.incorrect_answer];
                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
                answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;
                })

                return formattedQuestion;
            });
            startGame();
        })*/
        .catch(err => {
            console.error(err);
        });


    return (
        <>
            <body>
                <div class="container">
                    <div id="loader"></div>
                    <div id="game" class="justify-center flex-column hidden">
                        <div id="hud">
                            <div id="hud-item">
                                <p id="progressText" class="hud-prefix">
                                    Question
                                </p>
                                <div id="progressBar">
                                    <div id="progressBarFull"></div>
                                </div>
                            </div>
                            <div id="hud-item">
                                <p class="hud-prefix">
                                    Score
                                </p>
                                <h1 class="hud-main-text" id="score">
                                    0
                                </h1>
                            </div>
                        </div>
                        <h2 id="question"></h2>
                        <div class="choice-container">
                            <p class="choice-prefix">A</p>
                            <p class="choice-text" data-number="1"></p>
                        </div>
                        <div class="choice-container">
                            <p class="choice-prefix">B</p>
                            <p class="choice-text" data-number="2"></p>
                        </div>
                        <div class="choice-container">
                            <p class="choice-prefix">C</p>
                            <p class="choice-text" data-number="3"></p>
                        </div>
                        <div class="choice-container">
                            <p class="choice-prefix">D</p>
                            <p class="choice-text" data-number="4"></p>
                        </div>
                    </div>
                </div>
            </body></>
    )
}
export default Quiz;