import { useEffect, useState } from "react";
import EndScreen from "./EndScreen.js";
import Score from "./Score.js";
import QuizItem from "./QuizItem.js";
import { supabase } from "../../components/Database.js";
// import { updateScore } from "../../components/UpdateScore.js"

function convertDifficultyToPoints(difficulty) {
  if (difficulty === "easy") return 1;
  else if (difficulty === "medium") return 2;
  else if (difficulty === "hard") return 3;
  else throw new Error(`Invalid difficulty setting: ${difficulty}`);
}

function Game({ quizData, session }) {
  // const [playerScore,setPlayerScore] = useState('')

//   useEffect(() => {
//     const fetchData = async () => {
//         const userScore = await supabase.from('users').select('score').eq('id',session.user.id)
//         setPlayerScore(userScore)
//     }
//     fetchData()

// }, [])

  const [gameState, setGameState] = useState({
    score: 0,
    triviaIndex: 0,
    isGameOver: false,
    startTime: performance.now(),
  });

  const { score, triviaIndex, isGameOver, startTime } = gameState;
  const questionNumber = triviaIndex + 1;
  const numQuestions = quizData.length;
  const playTimeInSeconds = (performance.now() - startTime) / 1000;

  let userId;

  if(session!=null){
    userId = session.user.id;
  }
  

  const restartGame = () => {
    setGameState({
      score: 0,
      triviaIndex: 0,
      isGameOver: false,
      startTime: performance.now(),
    });
  };

  const loadNextQuestion = () => {
    if (triviaIndex >= quizData.length - 1) {
      setGameState({ ...gameState, isGameOver: true });
    } else {
      setGameState({ ...gameState, triviaIndex: triviaIndex + 1 });
    }
  };

  const onAnswerSelected = (wasPlayerCorrect, difficulty) => {
    const pointValue = convertDifficultyToPoints(difficulty);
    if (wasPlayerCorrect) {
      setGameState({
        ...gameState,
        score: score + pointValue,
      });
    }
  };

  let pageContent;
  let pageKey;
  let finalScore;
  async function updateScore(userId, score) {
    if (userId != null && isGameOver) {
        try {
            finalScore = 0
            const userScore = await supabase.from('users').select('score').eq('id', userId);
            console.log("userscore: " + userScore)
            finalScore = parseInt(score + userScore);
            console.log("Punteggio attuale: " + finalScore);
            await supabase.from('users').update({ score: finalScore }).eq('id', userId);
        } catch (err) {
            console.log("Errore nell'aggiornamento del punteggio: " + err);
        }
    }
  }

  if (isGameOver) {
    pageKey = "EndScreen";
    console.log("score: " + score)
    updateScore(session.user.id,score)
      pageContent = (
        <EndScreen
          score={score}
          onRetryClick={restartGame}
          playTime={playTimeInSeconds}
          session = {session}
        />
      );
  } else {
    pageKey = triviaIndex;
    const triviaQuestion = quizData[triviaIndex];
    const { correct_answer, incorrect_answers, question, difficulty } = triviaQuestion;
    pageContent = (
      <QuizItem
        key={triviaIndex}
        question={question}
        difficulty={difficulty}
        correctAnswer={correct_answer}
        incorrectAnswers={incorrect_answers}
        onNextClick={loadNextQuestion}
        onAnswerSelected={onAnswerSelected}
      />
    );
  }

  return (
    <>
      <br></br>
      <Score score={score} questionNumber={questionNumber} totalQuestions={numQuestions} />
      {pageContent}
    </>
  );
}

export default Game;