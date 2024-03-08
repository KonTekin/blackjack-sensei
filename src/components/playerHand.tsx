import { useContext } from "react";
import { PlayerContext } from "../context/player";
import { Card } from "./card";

import { nanoid } from "nanoid";

export const PlayerHand = () => {
	const { playerHand } = useContext(PlayerContext);

	return (
		<div className="player-hand-container">
			{playerHand[0].value !== 0 &&
				playerHand.map(({ value, suit }) => {
					const cardId = nanoid();
					return <Card key={cardId} value={value} suit={suit} />;
				})}
		</div>
	);
};
