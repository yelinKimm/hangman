import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const BASE_URL = 'https://random-word-api.herokuapp.com/word?number=3';
export default function SelectWord() {
  const [words, setWords] = useState<string[]>();


  const getRandomWords = async (number: number) => {
    // const randomWords: string[] = await axios.get(`${BASE_URL}?number=${number}`);
    const randomWords = ['apple', 'banana', 'mango'];
    if (randomWords) {
      setWords(randomWords);
    }
  };

  useEffect(() => {
    getRandomWords(3);
  }, []);

  return (
    <>
      <ul>
        {words?.map((word: string) => {
          return (
            <li key={word}>
              <Link to="/guess" state={{ currentWord: word }}>{word}</Link>
            </li>
          );
        })}
      </ul>
    </>
  )
}
