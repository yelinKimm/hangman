import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

type TargetWords = {
	id: string;
	character: string;
	filled: boolean;
}

type Alphabet = {
	character: string;
	disabled: boolean;
}

const MAX_COUNT = 8;

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

		if (count >= MAX_COUNT) {
			alert('기회 초과!');
			setShowRestartBtn(true);
			return;
		} else {
			setCount(count+1);
			
			const newCharacters = _.map(characters, (character: TargetWords) => {
				if (!character.filled) {
					return {...character, filled: target.character === character.character};
				} else {
					return character
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

  return (
    <>
			{
				characters?.map((characterItem: TargetWords) => {
					return (
						<span key={characterItem.id}>
							{characterItem.filled ? characterItem.character : 'ㅡ'}
						</span>
					);
				})
			}

			<hr />

			{alphabets?.map((alphabet: Alphabet) => {
				return (
					<button 
						key={alphabet.character} 
						onClick={() => onSelectAlphabet(alphabet)}
						disabled={alphabet.disabled}>
							{alphabet.character}
					</button>
				)
			})}

			<h3>{count}</h3>

			{showRestartBtn && (
				<button>
 					<NavLink to="/">Restart</NavLink>
				</button>
			)}
		</>
  )
}
