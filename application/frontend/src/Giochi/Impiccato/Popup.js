import React, { useEffect } from 'react';
import { checkWin } from './helpers.js';
import { supabase } from '../../components/Database.js';

const db = supabase;


async function updateScore(points,id){
  await db.from('users').update({points},'score').eq('id',{id});
}

const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, points, id}) => {

  const score = async () => {
    await db
    .from('users')
    .select(`score`)
    .eq('id', id)
    .single()
  }

  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = 'Congratulazioni! Hai vinto 10 punti! 😃';
    playable = false;
    points += 10;
    updateScore(points,id)
  } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = 'Sfortunatamente non hai indovinato, hai perso 10 punti 😕';
    finalMessageRevealWord = `...la parola era: ${selectedWord}`;
    playable = false;
    points -= 10;
    updateScore(points,id)
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
