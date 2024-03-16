import { useContext } from "react";
import { BlackjackHand, ICard, Winner } from "../constants";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";

const useAnalyze = () => {
	const { playerHandValue } = useContext(PlayerContext);
	const { dealerHandValue } = useContext(DealerContext);

	const calculateHandValue = (
		cards: ICard[],
		isFromPlayerHand: boolean,
	): number => {
		return cards.reduce(
			(acc, card) => acc + calcCardValue({ card, isFromPlayerHand }),
			0,
		);
	};

	// const currentPlayerHandValue = calculateHandValue(playerHand, true);
	// const currentDealerHandValue = calculateHandValue(dealerHand, false);

	const calcCardValue = ({
		card,
		isFromPlayerHand,
	}: { card: ICard; isFromPlayerHand: boolean }): number => {
		const { value } = card;
		if (value === 1) {
			//check total hand value exceeds 21 if card value is 11
			if (isFromPlayerHand) {
				return playerHandValue + 11 < 22 ? 11 : 1;
			}
			return dealerHandValue + 11 < 22 ? 11 : 1;
		}

		if (value >= 10) return 10;
		return value;
	};

	const checkForBlackjack = (): BlackjackHand => {
		if (dealerHandValue === 21 && playerHandValue === 21)
			return BlackjackHand.Draw;
		if (playerHandValue === 21) return BlackjackHand.Player;
		if (dealerHandValue === 21) return BlackjackHand.Dealer;

		return BlackjackHand.None;
	};

	const checkForRoundWinner = (): Winner => {
		if (dealerHandValue > 21) return Winner.Player;

		const blackjack = checkForBlackjack();

		if (blackjack === BlackjackHand.Dealer) return Winner.Dealer;
		if (blackjack === BlackjackHand.Player) return Winner.Player;
		if (blackjack === BlackjackHand.Draw) return Winner.Draw;

		if (dealerHandValue === playerHandValue) return Winner.Draw;

		if (dealerHandValue > playerHandValue) return Winner.Dealer;

		return Winner.Player;
	};

	const checkPlayerHandForBust = () => {
		return playerHandValue > 21 ? true : false;
	};
	return {
		checkForBlackjack,
		checkForRoundWinner,
		checkPlayerHandForBust,
		calculateHandValue,
		calcCardValue,
	};
};

export default useAnalyze;
