import { createContext, Dispatch, SetStateAction, useState } from "react";
import { blankHand, ICard, Props } from "./game";

interface IPlayerContext {
	playerHand: ICard[];
	isMakingBet: boolean;
	playerBalance: number;
	setPlayerBalance: Dispatch<SetStateAction<number>>;
	setIsMakingBet: Dispatch<SetStateAction<boolean>>;
	setPlayerHand: Dispatch<SetStateAction<ICard[]>>;
}

export const PlayerContext = createContext<IPlayerContext>({
	playerHand: [],
	isMakingBet: true,
	playerBalance: 100,
	setPlayerHand: () => {},
	setIsMakingBet: () => {},
	setPlayerBalance: () => {},
});

export const PlayerProvider = ({ children }: Props) => {
	const [playerHand, setPlayerHand] = useState([blankHand]);
	const [playerBalance, setPlayerBalance] = useState(100);
	const [isMakingBet, setIsMakingBet] = useState(true);

	const value = {
		isMakingBet,
		playerBalance,
		playerHand,
		setPlayerHand,
		setPlayerBalance,
		setIsMakingBet,
	};

	return (
		<PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
	);
};
