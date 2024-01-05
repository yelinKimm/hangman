import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const TitleWrapper = styled.div`
  padding-bottom: 30px;
`;
const Title = styled.h2`
  padding-bottom: 10px;
  font-size: 35px;
`;
const SubTitle = styled.div``;

const WordList = styled.ul`
  display: grid;
  gap: 20px;
`;
const WordItem = styled.li`
  padding: 20px 24px;
  font-weight: bold;
  font-size: 20px;
  outline: 3px solid #F7F6E8;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  &.odd {
    background-color: #8A795D;
    > a {
      color: #fff;
    }
  }

  &.even {
    outline: 3px solid #8A795D;
  }

  > a {
    color: #000;
    text-decoration: none;
  }
`;

// ----------------------------- //

let mountCount = 1

const BASE_URL = 'https://random-word-api.herokuapp.com/word';

export default function SelectWord() {
  const [didMount, setDidMount] = useState(false)
  const [words, setWords] = useState<string[]>([]);

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
    <Wrapper className='select-word-container'>
      <TitleWrapper>
        <Title>Hangman Challenge</Title>
        <SubTitle>Pick a word!</SubTitle>
      </TitleWrapper>

      <WordList>
        {words?.map((word: string, index: number) => {
          return (
            <WordItem className={index % 2 === 0 ? 'even' : 'odd'}>
              <Link 
                key={word} 
                to="/guess" 
                state={{ currentWord: word }} 
                className='word'>
                  {word}
              </Link>
            </WordItem>
          );
        })}
      </WordList>
    </Wrapper>
  )
}
