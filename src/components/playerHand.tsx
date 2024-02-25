import { useContext, useEffect } from "react";
import { PlayerContext } from "../context/player";
import { calcCardValue, calculateHandValue } from "../utils/game_utils";

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
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<div key={index} className="playing-card">
								<div>
									<div className="front-side">
										{value === 1 ? "Ace " : `${calcCardValue(value)} `}
										{suit}
									</div>
									<div className="back-side">
										{/* <img src="src/assets/backside_card.png" alt="" /> */}
										{value === 1 ? "Ace " : `${calcCardValue(value)} `}
										{suit}
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
};
