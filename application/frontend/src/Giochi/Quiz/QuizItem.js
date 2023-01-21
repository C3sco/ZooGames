import { useState } from "react";
import random from "./Random.js";
import './quiz.css'

function QuizItem({
  correctAnswer,
  incorrectAnswers,
  question,
  difficulty,
  onNextClick,
  onAnswerSelected,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const hasPickedAnswer = selectedAnswer !== null;

  const allAnswers = [correctAnswer, ...incorrectAnswers];
  const [shuffledAnswers] = useState(() => random(allAnswers));

  let nextButtonClassName = "trivia-item__button trivia-item__next-button";
  if (!hasPickedAnswer) nextButtonClassName += " trivia-item__button--disabled";

  const onAnswerClick = (event) => {
    const playerAnswer = event.target.innerHTML;
    setSelectedAnswer(playerAnswer);
    const wasPlayerCorrect = playerAnswer === correctAnswer;
    onAnswerSelected(wasPlayerCorrect, difficulty);
  };

  return (
    <div>
      <p className="trivia-item__difficulty">Difficoltà: {difficulty}</p>
      <p className="trivia-item__question">{question}</p>
      <ul className="trivia-item__answers">
        {shuffledAnswers.map((answer, i) => {
          let className = "trivia-item__button";
          if (hasPickedAnswer) {
            const pickedThisAnswer = answer === selectedAnswer;
            const isThisCorrect = answer === correctAnswer;
            if (pickedThisAnswer && isThisCorrect) {
              className += " trivia-item__button--correct";
            } else if (pickedThisAnswer && !isThisCorrect) {
              className += " trivia-item__button--incorrect";
            } else {
              className += " trivia-item__button--disabled";
            }
          }

          return (
            <li key={answer}>
              <button className={className} onClick={onAnswerClick} disabled={hasPickedAnswer}>
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
      <button className={nextButtonClassName} onClick={onNextClick} disabled={!hasPickedAnswer}>
        Next
      </button>
    </div>
  );
}

export default QuizItem;