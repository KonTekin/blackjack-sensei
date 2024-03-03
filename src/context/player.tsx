import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ICard, Props, blankHand } from "../constants";

interface IPlayerContext {
	playerHand: ICard[];
	isMakingBet: boolean;
	playerBalance: number;
	playerHandValue: number;
	playerBet: number;
	isPlayerTurn: boolean;
	setPlayerBet: Dispatch<SetStateAction<number>>;
	setIsPlayerTurn: Dispatch<SetStateAction<boolean>>;
	setPlayerBalance: Dispatch<SetStateAction<number>>;
	setIsMakingBet: Dispatch<SetStateAction<boolean>>;
	setPlayerHand: Dispatch<SetStateAction<ICard[]>>;
	setPlayerHandValue: Dispatch<SetStateAction<number>>;
}

export const PlayerContext = createContext<IPlayerContext>({
	playerHand: [],
	isMakingBet: true,
	playerBalance: 100,
	playerHandValue: 0,
	playerBet: 0,
	isPlayerTurn: false,
	setPlayerHand: () => {},
	setIsMakingBet: () => {},
	setPlayerBalance: () => {},
	setPlayerHandValue: () => {},
	setPlayerBet: () => {},
	setIsPlayerTurn: () => {},
});

export const PlayerProvider = ({ children }: Props) => {
	const [playerHand, setPlayerHand] = useState([blankHand]);
	const [playerBalance, setPlayerBalance] = useState(100);
	const [isMakingBet, setIsMakingBet] = useState(true);
	const [playerHandValue, setPlayerHandValue] = useState(0);
	const [playerBet, setPlayerBet] = useState(0);
	const [isPlayerTurn, setIsPlayerTurn] = useState(false);

	const value = {
		isMakingBet,
		playerBalance,
		playerHand,
		playerHandValue,
		playerBet,
		isPlayerTurn,
		setPlayerHand,
		setPlayerBalance,
		setIsMakingBet,
		setPlayerHandValue,
		setPlayerBet,
		setIsPlayerTurn,
	};

	return (
		<PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
	);
};
