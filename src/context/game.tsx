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

interface ICard {
	suit: string;
	value: number;
}

interface IGameContext {
	gameDeck: ICard[];
	playerHand: ICard[];
	dealerHand: ICard[];
	isMakingBet: boolean;
	playerBet: number;
	playerBalance: number;
	setGameDeck: Dispatch<SetStateAction<ICard[]>>;
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
	playerHand: [],
	dealerHand: [],
	isMakingBet: true,
	playerBet: 0,
	playerBalance: 100,
	setGameDeck: () => {},
	setDealerHand: () => {},
	setPlayerHand: () => {},
	setIsMakingBet: () => {},
	setPlayerBet: () => {},
});

export const GameProvider = ({ children }: Props) => {
	const [gameDeck, setGameDeck] = useState(Deck);
	const [playerHand, setPlayerHand] = useState([blankHand]);
	const [dealerHand, setDealerHand] = useState([blankHand]);
	const [isMakingBet, setIsMakingBet] = useState(true);
	const [playerBet, setPlayerBet] = useState(0);
	const [playerBalance, setPlayerBalance] = useState(100);

	const value = {
		gameDeck,
		playerHand,
		dealerHand,
		isMakingBet,
		playerBet,
		playerBalance,
		setDealerHand,
		setGameDeck,
		setIsMakingBet,
		setPlayerBet,
		setPlayerHand,
		setPlayerBalance,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
