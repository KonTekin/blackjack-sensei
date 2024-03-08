import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Deck } from "../deck-of-cards";
import { GameState, ICard, Props } from "../constants";

interface IGameContext {
	gameDeck: ICard[];
	gameState: GameState;
	currentPosOfGameDeck: number;
	dealersTurnInProgress: boolean;
	setGameState: Dispatch<SetStateAction<GameState>>;
	setDealersTurnInProgress: Dispatch<SetStateAction<boolean>>;
	setGameDeck: Dispatch<SetStateAction<ICard[]>>;
	setCurrentPosOfGameDeck: Dispatch<SetStateAction<number>>;
}

export const GameContext = createContext<IGameContext>({
	gameDeck: [],
	gameState: GameState.Betting,
	currentPosOfGameDeck: 0,
	dealersTurnInProgress: false,
	setDealersTurnInProgress: () => {},
	setGameDeck: () => {},
	setCurrentPosOfGameDeck: () => {},
	setGameState: () => {},
});

export const GameProvider = ({ children }: Props) => {
	const [gameDeck, setGameDeck] = useState([...Deck, ...Deck]);
	const [currentPosOfGameDeck, setCurrentPosOfGameDeck] = useState(0);
	const [dealersTurnInProgress, setDealersTurnInProgress] = useState(false);
	const [gameState, setGameState] = useState(GameState.Betting);

	const value = {
		gameDeck,
		currentPosOfGameDeck,
		dealersTurnInProgress,
		gameState,
		setGameState,
		setDealersTurnInProgress,
		setGameDeck,
		setCurrentPosOfGameDeck,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
