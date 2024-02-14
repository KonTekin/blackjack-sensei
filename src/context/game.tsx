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

interface IGameContext {
	gameDeck: ICard[];
	currentPosOfGameDeck: number;
	playerHand: ICard[];
	dealerHand: ICard[];
	isMakingBet: boolean;
	playerBet: number;
	playerBalance: number;
	setGameDeck: Dispatch<SetStateAction<ICard[]>>;
	setCurrentPosOfGameDeck: Dispatch<SetStateAction<number>>;
	setDealerHand: Dispatch<SetStateAction<ICard[]>>;
	setPlayerHand: Dispatch<SetStateAction<ICard[]>>;
	setIsMakingBet: Dispatch<SetStateAction<boolean>>;
	setPlayerBet: Dispatch<SetStateAction<number>>;
}

const blankHand: ICard = {
	suit: "none",
	value: 0,
};

export const GameContext = createContext<IGameContext>({
	gameDeck: [],
	currentPosOfGameDeck: 0,
	playerHand: [],
	dealerHand: [],
	isMakingBet: true,
	playerBet: 0,
	playerBalance: 100,
	setGameDeck: () => {},
	setCurrentPosOfGameDeck: () => {},
	setDealerHand: () => {},
	setPlayerHand: () => {},
	setIsMakingBet: () => {},
	setPlayerBet: () => {},
});

export const GameProvider = ({ children }: Props) => {
	const [gameDeck, setGameDeck] = useState(Deck);
	const [currentPosOfGameDeck, setCurrentPosOfGameDeck] = useState(0);
	const [playerHand, setPlayerHand] = useState([blankHand]);
	const [dealerHand, setDealerHand] = useState([blankHand]);
	const [isMakingBet, setIsMakingBet] = useState(true);
	const [playerBet, setPlayerBet] = useState(0);
	const [playerBalance, setPlayerBalance] = useState(100);

	const value = {
		gameDeck,
		currentPosOfGameDeck,
		playerHand,
		dealerHand,
		isMakingBet,
		playerBet,
		playerBalance,
		setDealerHand,
		setGameDeck,
		setCurrentPosOfGameDeck,
		setIsMakingBet,
		setPlayerBet,
		setPlayerHand,
		setPlayerBalance,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
