import { useContext } from "react";
import { GameContext } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import { GameState, ICard, blankHand } from "../constants";

const useGameActions = () => {
	const { setGameState, setGameDeck, gameDeck } = useContext(GameContext);
	const { setPlayerBet, setPlayerHand, setPlayerHandValue, playerHand } =
		useContext(PlayerContext);
	const { setDealerHand, setDealerHandValue, dealerHand } =
		useContext(DealerContext);

	const addCardToHand = ({ isForPlayer }: { isForPlayer: boolean }) => {
		const nextCard = dealCard();
		if (isForPlayer) {
			playerHand.push(nextCard);
			setPlayerHand(playerHand);
		} else {
			dealerHand.push(nextCard);
			setDealerHand(dealerHand);
		}
	};

	const dealCard = (): ICard => {
		// Todo: Need to add a check to see if deck is empty, if so then shuffle new deck
		const nextCard = gameDeck.pop();
		setGameDeck([...gameDeck]);

		return nextCard ? nextCard : { value: 0, suit: "empty" };
	};

	const resetRound = () => {
		setPlayerBet(0);
		setPlayerHandValue(0);
		setDealerHandValue(0);
		setGameState(GameState.Betting);
		setPlayerHand([blankHand]);
		setDealerHand([blankHand]);
	};

	return { addCardToHand, dealCard, resetRound };
};

export default useGameActions;
