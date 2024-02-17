import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
import { Deck } from "../deck-of-cards";

interface Props {
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
	dealerHand: ICard[];
	playerBet: number;
	setGameDeck: Dispatch<SetStateAction<ICard[]>>;
	setCurrentPosOfGameDeck: Dispatch<SetStateAction<number>>;
	setDealerHand: Dispatch<SetStateAction<ICard[]>>;
	setPlayerBet: Dispatch<SetStateAction<number>>;
}

export const GameContext = createContext<IGameContext>({
	gameDeck: [],
	currentPosOfGameDeck: 0,
	dealerHand: [],
	playerBet: 0,
	setGameDeck: () => {},
	setCurrentPosOfGameDeck: () => {},
	setDealerHand: () => {},
	setPlayerBet: () => {},
});

export const GameProvider = ({ children }: Props) => {
	const [gameDeck, setGameDeck] = useState(Deck);
	const [currentPosOfGameDeck, setCurrentPosOfGameDeck] = useState(0);
	const [dealerHand, setDealerHand] = useState([blankHand]);
	const [playerBet, setPlayerBet] = useState(0);

	const value = {
		gameDeck,
		currentPosOfGameDeck,
		dealerHand,
		playerBet,
		setDealerHand,
		setGameDeck,
		setCurrentPosOfGameDeck,
		setPlayerBet,
		
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
