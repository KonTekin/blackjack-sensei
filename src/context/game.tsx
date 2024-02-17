import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
import { Deck } from "../deck-of-cards";

export interface Props {
	children?: ReactNode;
}

export interface ICard {
	suit: string;
	value: number;
}
export const blankHand: ICard = {
	suit: "none",
	value: 0,
};

interface IGameContext {
	gameDeck: ICard[];
	currentPosOfGameDeck: number;
	playerBet: number;
	isPlayerTurn: boolean;
	setGameDeck: Dispatch<SetStateAction<ICard[]>>;
	setCurrentPosOfGameDeck: Dispatch<SetStateAction<number>>;
	setPlayerBet: Dispatch<SetStateAction<number>>;
	setIsPlayerTurn: Dispatch<SetStateAction<boolean>>;
}

export const GameContext = createContext<IGameContext>({
	gameDeck: [],
	currentPosOfGameDeck: 0,
	playerBet: 0,
	isPlayerTurn: false,
	setGameDeck: () => {},
	setCurrentPosOfGameDeck: () => {},
	setPlayerBet: () => {},
	setIsPlayerTurn: () => {},
});

export const GameProvider = ({ children }: Props) => {
	const [gameDeck, setGameDeck] = useState(Deck);
	const [currentPosOfGameDeck, setCurrentPosOfGameDeck] = useState(0);
	const [playerBet, setPlayerBet] = useState(0);
	const [isPlayerTurn, setIsPlayerTurn] = useState(false);

	const value = {
		gameDeck,
		currentPosOfGameDeck,
		playerBet,
		isPlayerTurn,
		setGameDeck,
		setCurrentPosOfGameDeck,
		setPlayerBet,
		setIsPlayerTurn,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
