import { useContext } from "react";
import { PlayerContext } from "../context/player";

export const PlayerHandInfo = () => {
	const player = useContext(PlayerContext);

	return (
		<>
			<div className="player-info-container">
				<div>Current Balance: {player.playerBalance}</div>
				<div>Player hand value: {player.playerHandValue}</div>
			</div>
		</>
	);
};
