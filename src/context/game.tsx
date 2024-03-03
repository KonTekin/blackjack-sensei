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
	dealersTurnInProgress: boolean;
	setDealersTurnInProgress: Dispatch<SetStateAction<boolean>>;
	setGameDeck: Dispatch<SetStateAction<ICard[]>>;
	setCurrentPosOfGameDeck: Dispatch<SetStateAction<number>>;
}

export const GameContext = createContext<IGameContext>({
	gameDeck: [],
	currentPosOfGameDeck: 0,
	dealersTurnInProgress: false,
	setDealersTurnInProgress: () => {},
	setGameDeck: () => {},
	setCurrentPosOfGameDeck: () => {},
});

export const GameProvider = ({ children }: Props) => {
	const [gameDeck, setGameDeck] = useState(Deck);
	const [currentPosOfGameDeck, setCurrentPosOfGameDeck] = useState(0);
	const [dealersTurnInProgress, setDealersTurnInProgress] = useState(false);

	const value = {
		gameDeck,
		currentPosOfGameDeck,
		dealersTurnInProgress,
		setDealersTurnInProgress,
		setGameDeck,
		setCurrentPosOfGameDeck,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
