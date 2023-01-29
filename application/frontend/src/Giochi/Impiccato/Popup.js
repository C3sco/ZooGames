import React, { useEffect, useState } from 'react';
import { checkWin } from './helpers.js';
import { supabase } from '../../components/Database.js';

const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, id}) => {
  const [scoreUpdated, setScoreUpdated] = useState(true)

  let finalScore = 0
  async function updateScore(userId, score) {
    if (userId != null && !scoreUpdated) {
      try {
        setScoreUpdated(true)
        finalScore = 0
        const userScore = await supabase.from('users').select('score').eq('id', userId);
        finalScore = parseInt(score + userScore.data[0].score);
        await supabase.from('users').update({ 'score': finalScore }).eq('id', userId);
        console.log("Punteggio Arggiornato! Ora hai: " + finalScore + " punti")

      } catch (err) {
        console.log("Errore nell'aggiornamento del punteggio: " + err);
      }
    }
  }

  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = 'Congratulazioni! Hai vinto 5 punti! 😃';
    playable = false;
    let points = 5;
    updateScore(id,points)
  } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = 'Sfortunatamente non hai indovinato! 😕';
    finalMessageRevealWord = `...la parola era: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button className='c3-play' onClick={playAgain}>Gioca di nuovo!</button>
      </div>
    </div>
  )
}

export default Popup
