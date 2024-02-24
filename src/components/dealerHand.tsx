import { useContext } from "react";
import { calcCardValue } from "../utils/game_utils";
import { DealerContext } from "../context/dealer";

export const DealerHand = () => {
	const { dealerHand } = useContext(DealerContext);
	return (
		<div className="dealer-hand-container">
			{dealerHand[0].value !== 0 &&
				dealerHand.map(({ value, suit }, index) => {
					return (
						<>
							{/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
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
						</>
					);
				})}
		</div>
	);
};
