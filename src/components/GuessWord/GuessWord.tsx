import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	max-width: 500px;
	margin: 50px auto;
`;

const GameView = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: 40px;
`;
const GameCounts = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
`;
const Count = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid;
	border-radius: 10px;

	&.filled {
		color: tomato;
	}
`;
const Hangman = styled.div`
	display: flex;
	justify-content: center;
`;
const HangmanImg = styled.img`
	width: 100%;
	
`;
const TargetWordsContainer = styled.div`
	padding: 20px 0;
	margin: 20px 0;
	text-align: center;
	border: 2px dashed rgba(0,0,0,0.2);
	border-radius: 10px;
	display: flex;
	justify-content: center;

`;
const Words = styled.p`
	width: 20px;
	height: 20px;
	border-bottom: 2px solid;
	margin-right: 5px;

	&:last-child {
		margin-right: 0;
	}
`;
const Alphabets = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
const Alphabet = styled.button`
	width: 50px;
	height: 50px;
	font-size: 25px;
	background-color: #fff;
	border-radius: 10px;
	margin: 3px;
	border: none;
	box-shadow: 0 0 3px rgba(0,0,0,0.12);
	cursor: pointer;

	&:hover {
		background-color: #f4eece;
	}

	&:disabled {
		background-color: #fff;
		cursor: not-allowed;
	}
`;

const GameOverContainer = styled.div`
	background-color: rgba(0,0,0,0.6);
	width: 100%;
	height: 100%;
	position: absolute;
	left:	0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const GameOverModal = styled.div`
	display: grid;
	width: 300px;
	height: 120px;
	padding: 20px;
	border-radius: 20px;
	background-color: #fff;
`;

const GameOverTitle = styled.h2`
	text-align: center;
`;

const RestartBtn = styled.button`
	padding: 0 20px;
	font-size: 17px;
	border-radius: 10px;
	border: none;
	cursor: pointer;

	> a {
		color: #000;
		text-decoration: none;
	}
	&:hover {
		opacity: 0.7;
	}
`;

type TargetWords = {
	id: string;
	character: string;
	filled: boolean;
}

type Alphabet = {
	character: string;
	disabled: boolean;
}

const MAX_COUNT = 10;

const ALPHABETS: string[] = [
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

export default function GuessWord() {
	const [count, setCount] = useState<number>(0);
	const [alphabets, setAlphabets] = useState<Alphabet[]>();
	const [characters, setCharacters] = useState<TargetWords[]>([]);
	const [showRestartBtn, setShowRestartBtn] = useState<boolean>(false);

	const navigate = useNavigate();

	const { state: { currentWord } } = useLocation();

	const initAlphabets = () => {
		const initialAlphabets =  ALPHABETS.map((alpahbet: string) => { 
			return { character: alpahbet, disabled: false }
		});

		setAlphabets(initialAlphabets);
	}

	const onSelectAlphabet = (target: Alphabet) => {

		if (count < MAX_COUNT) {
			if (!_.includes(_.map(characters, "character"), target.character)) {
				setCount(count+1);
				return;
			}

			if (alphabets) {
				const netAlphabets: Alphabet[] = alphabets.map((alphabet: Alphabet) => {
					if (alphabet.character === target.character) {
						return { character: target.character, disabled: true};
					} else {
						return alphabet;
					}
				})
				setAlphabets(netAlphabets);
			}

			const newCharacters = _.map(characters, (character: TargetWords) => {
				if (!character.filled) {
					return {...character, filled: target.character === character.character};
				} else {
					return character;
				}
			});
	
			setCharacters(newCharacters);
			if (_.filter(newCharacters, { filled: false }).length === 0) {
				setTimeout(() => {
					alert('congrats!!');
					setShowRestartBtn(true);
				}, 500);
			}
		}
	}

	useEffect(() => {
		if (!currentWord) {
			navigate('/');
			return;
		}

		initAlphabets();

		if (currentWord) {
			const spiltWords: TargetWords[] = currentWord.split('').map((wordItem: string) => {
				return {
					id: uuidv4(),
					character: wordItem,
					filled: false
				}
			});

			setCharacters(spiltWords);
		}
	}, []);

	useEffect(() => {
		if (count >= MAX_COUNT) {
			alert('기회 초과!');
			setShowRestartBtn(true);
			return;
		}
	}, [count]);

  return (
    <Wrapper>
			<GameView>
				<GameCounts>
					{[...Array(MAX_COUNT)].map((e, i) => {
							return <Count className={i < count ? "filled": ""}>
								<svg data-slot="icon" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"></path>
								</svg>
							</Count>
						})}
				</GameCounts>

				<Hangman>
					<HangmanImg src={`/hangman/step${count}.png`}></HangmanImg>
				</Hangman>
			</GameView>

			<TargetWordsContainer>
				{
					characters?.map((characterItem: TargetWords) => {
						return (
							<Words key={characterItem.id}>
								{characterItem.filled ? characterItem.character.toUpperCase() : ''}
							</Words>
						);
					})
				}
			</TargetWordsContainer>

			<Alphabets>
				{alphabets?.map((alphabet: Alphabet) => {
					return (
						<Alphabet 
							key={alphabet.character} 
							onClick={() => onSelectAlphabet(alphabet)}
							disabled={alphabet.disabled}>
								{alphabet.character.toUpperCase()}
						</Alphabet>
					)
				})}
			</Alphabets>

			{showRestartBtn && (
				<GameOverContainer>
					<GameOverModal>
						<GameOverTitle>
							Game Over
						</GameOverTitle>

						<RestartBtn>
							<NavLink to="/">Restart</NavLink>
						</RestartBtn>
					</GameOverModal>
				</GameOverContainer>
			)}
		</Wrapper>
  )
}
