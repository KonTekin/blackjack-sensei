import { createContext, Dispatch, SetStateAction, useState } from "react";
import { blankHand, ICard, Props } from "./game";

interface IPlayerContext {
	playerHand: ICard[];
	isMakingBet: boolean;
	playerBalance: number;
	playerHandValue: number;
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
	setPlayerHand: () => {},
	setIsMakingBet: () => {},
	setPlayerBalance: () => {},
	setPlayerHandValue: () => {},
});

export const PlayerProvider = ({ children }: Props) => {
	const [playerHand, setPlayerHand] = useState([blankHand]);
	const [playerBalance, setPlayerBalance] = useState(100);
	const [isMakingBet, setIsMakingBet] = useState(true);
	const [playerHandValue, setPlayerHandValue] = useState(0);

	const value = {
		isMakingBet,
		playerBalance,
		playerHand,
		playerHandValue,
		setPlayerHand,
		setPlayerBalance,
		setIsMakingBet,
		setPlayerHandValue,
	};

	return (
		<PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
	);
};
