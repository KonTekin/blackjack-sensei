import { useContext } from "react";
import { GameContext } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import { BlackjackHand, GameState, ICard, blankHand } from "../constants";
import { displayEndOfRoundMessage } from "../utils/game_utils";
import useAnalyze from "./useAnalyze";

const useGameActions = () => {
	const { setGameState, setGameDeck, gameDeck } = useContext(GameContext);
	const { setPlayerBet, setPlayerHand, setPlayerHandValue, playerHand } =
		useContext(PlayerContext);
	const { setDealerHand, setDealerHandValue, dealerHand } =
		useContext(DealerContext);

	const { calculateHandValue, checkForBlackjack } = useAnalyze();

	const addCardToHand = ({
		isForPlayer,
		isHidden,
	}: { isForPlayer: boolean; isHidden: boolean }) => {
		const nextCard = dealCard();
		nextCard.isHidden = isHidden;
		if (isForPlayer) {
			playerHand.push(nextCard);
			setPlayerHand(playerHand);
		} else {
			setDealerHand((prevHand) => {
				return [...prevHand, nextCard];
			});
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

	const dealInitialHands = () => {
		const count = 0;
		dealerHand.pop();
		playerHand.pop();

		for (let i = count; i < 4; i++) {
			if (i % 2 === 0) {
				i === 0
					? addCardToHand({ isForPlayer: false, isHidden: true })
					: addCardToHand({ isForPlayer: false, isHidden: false });
			} else {
				addCardToHand({ isForPlayer: true, isHidden: false });
			}
		}

		const currentPlayerHandValue = calculateHandValue(playerHand, true);
		setPlayerHandValue(currentPlayerHandValue);

		const blackjack = checkForBlackjack();
		if (blackjack !== BlackjackHand.None) {
			displayEndOfRoundMessage(blackjack);
			setTimeout(() => resetRound(), 5000);
		}
	};

	return { addCardToHand, dealCard, resetRound, dealInitialHands };
};

export default useGameActions;
