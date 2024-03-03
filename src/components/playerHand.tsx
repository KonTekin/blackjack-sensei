import { useContext, useEffect } from "react";
import { PlayerContext } from "../context/player";
import { Card } from "./card";
import { calculateHandValue } from "../utils/game_utils";
import { nanoid } from "nanoid";

export const PlayerHand = () => {
	const { playerHand, setPlayerHandValue } = useContext(PlayerContext);
	useEffect(() => {
		const totalHandValue = calculateHandValue(playerHand);
		setPlayerHandValue(totalHandValue);
	}, [playerHand, setPlayerHandValue]);
	return (
		<>
			<div className="player-hand-container">
				{playerHand[0].value !== 0 &&
					playerHand.map(({ value, suit }) => {
						const cardId = nanoid();

						return <Card key={cardId} value={value} suit={suit} />;
					})}
			</div>
		</>
	);
};
