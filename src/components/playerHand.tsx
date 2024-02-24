import { useContext } from "react";
import { PlayerContext } from "../context/player";
import { calcCardValue } from "../utils/game_utils";

export const PlayerHand = () => {
	const player = useContext(PlayerContext);
	return (
		<>
			<div className="player-hand-container">
				{player.playerHand[0].value !== 0 &&
					player.playerHand.map(({ value, suit }, index) => {
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
