import { useContext, useEffect } from "react";
import { PlayerContext } from "../context/player";
import { calculateHandValue } from "../utils/game_utils";
import { Card } from "./card";

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
					playerHand.map(({ value, suit }, index) => {
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						return <Card key={index} value={value} suit={suit} />;
					})}
			</div>
		</>
	);
};
