import axios from "axios";
import React, { useState } from "react";
import Loading from "./Loading.js";

const url = "https://opentdb.com/api.php?amount=10&category=27";

export default function QuizFinal() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);

  const [isEndOpen, setIsEndOpen] = useState(false);


  const fetchQuestions = async (url) => {
    setLoading(true);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(response.data.results);
        setLoading(false);
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openEnd();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openEnd = () => {
    setIsEndOpen(true);
  };

  const closeEnd = () => {
    setCorrect(0);
    setIsEndOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions(url);
  };

  if (loading) {
    return <Loading />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer];

  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    //  <End />
    <>
    HELLO!
      <body>
      <button type="submit" onClick={handleSubmit} className="submit-btn">
            start
          </button>
      
        <section className="quiz">
          <p className="correct-answers">
            correct answers:{correct}/{index}
          </p>
          <article className="container">
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    className="answer-btn"
                    onClick={() => {
                      checkAnswer(correct_answer === answer);
                    }}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                );
              })}
            </div>
          </article>
          <button className="next-question" onClick={nextQuestion}>
            next question
          </button>
        </section>
      </body>
    </>
  );
};

/*
  const End = () => {

    return (
      <div
        className={`${isEndOpen ? "End-container isOpen" : "End-container"
          }`}
      >
        <div className="End-content">
          <h2>congrats!</h2>
          <p>
            You answered {((correct / questions.length) * 100).toFixed(0)}% of
            questions correctly
          </p>
          <button className="close-btn" onClick={closeEnd}>
            Play again
          </button>
        </div>
      </div>
    );
  };

*/