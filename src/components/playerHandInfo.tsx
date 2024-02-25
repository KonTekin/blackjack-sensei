import { useContext } from "react";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";

export const PlayerHandInfo = () => {
	const { playerBalance, playerHandValue } = useContext(PlayerContext);
	const { dealerHandValue } = useContext(DealerContext);

	return (
		<>
			<div className="player-info-container">
				<div>Current Balance: {playerBalance}</div>
				<div>Player hand value: {playerHandValue}</div>
				<div>Dealer hand value: {dealerHandValue}</div>
			</div>
		</>
	);
};
