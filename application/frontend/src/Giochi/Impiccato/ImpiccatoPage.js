import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Figure from './Figure.js';
import WrongLetters from './WrongLetters.js';
import Word from './Word.js';
import Popup from './Popup.js';
import Notification from './Notification.js';
import { showNotification as show } from './helpers.js';
import './impiccato.css';
import { supabase } from '../../components/Database.js';
import Loading from '../../components/Loading.js';

const db = supabase;

function Impiccato({ session }) {
  const [words, setWords] = useState([]);
  const [selectedWord, setRandomWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  let id;
  if (session != null) {
    id = session.user.id;
  }

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await db.from('animals').select();
        setWords(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchWords();
  }, []);

  useEffect(() => {
    if (!loading && words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setRandomWord(words[randomIndex].Nome.toLowerCase());
    }
  }, [words, loading]);

  useEffect(() => {

    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);

    if (!loading && words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setRandomWord(words[randomIndex].Nome.toLowerCase());
    }
  }

  let contents;
  if (loading) {
    contents = <Loading />
  } else {
    contents =
      <div>
        <Header />
        <div className="game-container">
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} id={id} />
        <Notification showNotification={showNotification}/>
      </div>
  }

  return (
    <>
    {contents}
    </>
  );
}


export default Impiccato;  