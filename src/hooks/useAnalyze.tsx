import { useContext } from "react";
import { BlackjackHand, Winner } from "../constants";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import { calculateHandValue } from "../utils/game_utils";

const useAnalyze = () => {
	const { playerHand } = useContext(PlayerContext);
	const { dealerHand } = useContext(DealerContext);

	const currentPlayerHandValue = calculateHandValue(playerHand);
	const currentDealerHandValue = calculateHandValue(dealerHand);

	const checkForBlackjack = (): BlackjackHand => {
		if (currentDealerHandValue === 21 && currentPlayerHandValue === 21)
			return BlackjackHand.Draw;
		if (currentPlayerHandValue === 21) return BlackjackHand.Player;
		if (currentDealerHandValue === 21) return BlackjackHand.Dealer;

		return BlackjackHand.None;
	};

	const checkForRoundWinner = (): Winner => {
		if (currentDealerHandValue > 21) return Winner.Player;

		const blackjack = checkForBlackjack();

		if (blackjack === BlackjackHand.Dealer) return Winner.Dealer;
		if (blackjack === BlackjackHand.Player) return Winner.Player;
		if (blackjack === BlackjackHand.Draw) return Winner.Draw;

		if (currentDealerHandValue === currentPlayerHandValue) return Winner.Draw;

		if (currentDealerHandValue > currentPlayerHandValue) return Winner.Dealer;

		return Winner.Player;
	};

	const checkPlayerHandForBust = () => {
		return currentPlayerHandValue > 21 ? true : false;
	};
	return { checkForBlackjack, checkForRoundWinner, checkPlayerHandForBust };
};

export default useAnalyze;
