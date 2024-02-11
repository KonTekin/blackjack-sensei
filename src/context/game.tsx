import { createContext, ReactNode, useState } from "react";
import * as DECK from "../deck-of-cards.json";

interface Props {
	children?: ReactNode;
}

export const GameContext = createContext({
	gameDeck: [{}],
	playerHand: [],
	dealerHand: [],
	isMakingBet: false,
	playerBet: 0,
});

export const GameProvider = ({ children }: Props) => {
	const [gameDeck, setGameDeck] = useState(DECK);
	const [playerHand, setPlayerHand] = useState([]);
	const [dealerHand, setDealerHand] = useState([]);
	const [isMakingBet, setIsMakingBet] = useState(true);
	const [playerBet, setPlayerBet] = useState(0);

	const value = {
		gameDeck,
		playerHand,
		dealerHand,
		isMakingBet,
		playerBet,
		setDealerHand,
		setGameDeck,
		setIsMakingBet,
		setPlayerBet,
		setPlayerHand,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
