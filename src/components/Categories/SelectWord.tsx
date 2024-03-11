import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from "react-query";
import { getRandomWords } from '../../api';

const WORD_COUNT = 5;

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

export default function SelectWord() {
  const { isLoading, data: wordList } = useQuery("randomWords", () => getRandomWords(WORD_COUNT));

  return (
    <Wrapper className='select-word-container'>
      <TitleWrapper>
        <Title>Hangman Challenge</Title>
        <SubTitle>Pick a word!</SubTitle>
      </TitleWrapper>

      {
        isLoading ? 
        "Loading..." : 
        (
          <WordList>
            {wordList?.map((word: string, index: number) => {
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
        )
      }
    </Wrapper>
  )
}
