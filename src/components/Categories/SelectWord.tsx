import { Card, List, ListItemButton, ListItemText } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import type * as CSS from 'csstype';

let mountCount = 1

const BASE_URL = 'https://random-word-api.herokuapp.com/word';
export default function SelectWord() {
  const [didMount, setDidMount] = useState(false)
  const [words, setWords] = useState<string[]>();

  const containerStyle: CSS.Properties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }

  const style = {
    '&.MuiList-root': {
     

      '.word': {
        textDecoration: 'none'
      }
    }
  }

  const linkStyle = {
    textDecoration: 'none'
  }

  const listItemStyle = {
    '&.MuiListItemButton-root': {
      padding: '16px 24px',
      // backgroundColor: 'gold',
      borderRadius: '10px',
      marginBottom: '16px',
      fontSize: '20px',
      fontWeight: 'bold',

      '&.odd': {
        backgroundColor: '#E3ECFF',
        color: '#508EF6'
        
      },
      '&.even': {
        backgroundColor: '#F3E9FF',
        color: '#A97BFF'
      }
    }
  } 


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
  }, []);

  useEffect(() => {
    if (didMount) {
      getRandomWords(5);
    }
  }, [didMount]);

  return (
    <div className='select-word-container' style={containerStyle}>
      <div>
        <h3>Hangman Challenge</h3>
        <span>Pick a word!</span>
      </div>

      <List sx={style}>
        {words?.map((word: string, index: number) => {
          return (
            <Link key={word} to="/guess" state={{ currentWord: word }} className='word'>
              <ListItemButton sx={listItemStyle} className={index % 2 === 0 ? 'even' : 'odd'}>
                {/* {index + 1} */}
                {word}
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </div>
  )
}
