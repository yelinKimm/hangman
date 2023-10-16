import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

let mountCount = 1

const BASE_URL = 'https://random-word-api.herokuapp.com/word';
export default function SelectWord() {
  const [didMount, setDidMount] = useState(false)
  const [words, setWords] = useState<string[]>();


  const getRandomWords = async (number: number) => {
    try {
      const response: AxiosResponse = await axios.get(`${BASE_URL}?number=${number}`);
      const randomWords = response.data;
      if (randomWords) {
        setWords(randomWords);
      }
    } catch (error) {
      console.log('[SelectWord/getRandomWords] get words failed. error=', error)
    }
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true)

    return () => {

    }
  }, []);

  useEffect(() => {
    if (didMount) {
      getRandomWords(3);
    }
  }, [didMount]);

  return (
    <>
      <ul>
        {words?.map((word: string, index: number) => {
          return (
            <li key={word}>
              <Link to="/guess" state={{ currentWord: word }}>{index}</Link>
            </li>
          );
        })}
      </ul>
    </>
  )
}
