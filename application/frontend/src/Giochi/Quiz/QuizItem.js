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

  let nextButtonClassName = "quiz_button quiz_next-button";
  if (!hasPickedAnswer) nextButtonClassName += " quiz_button--disabled";

  const onAnswerClick = (event) => {
    const playerAnswer = event.target.innerHTML;
    setSelectedAnswer(playerAnswer);
    const wasPlayerCorrect = playerAnswer === correctAnswer;
    onAnswerSelected(wasPlayerCorrect, difficulty);
  };

  return (
    <div>
      <p className="quiz_difficulty">Difficoltà: {difficulty}</p>
      <p className="quiz_question">{question}</p>
      <ul className="quiz_answers">
        {shuffledAnswers.map((answer, i) => {
          let className = "quiz_button";
          if (hasPickedAnswer) {
            const pickedThisAnswer = answer === selectedAnswer;
            const isThisCorrect = answer === correctAnswer;
            if (pickedThisAnswer && isThisCorrect) {
              className += " quiz_button--correct";
            } else if (pickedThisAnswer && !isThisCorrect) {
              className += " quiz_button--incorrect";
            } else {
              className += " quiz_button--disabled";
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