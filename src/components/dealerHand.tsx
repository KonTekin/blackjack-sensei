import { useContext, useEffect } from "react";
import { calcCardValue, calculateHandValue } from "../utils/game_utils";
import { DealerContext } from "../context/dealer";

export const DealerHand = () => {
	const { dealerHand, setDealerHandValue } = useContext(DealerContext);

	useEffect(() => {
		const totalHandValue = calculateHandValue(dealerHand);
		setDealerHandValue(totalHandValue);
	}, [dealerHand, setDealerHandValue]);
	return (
		<div className="dealer-hand-container">
			{dealerHand[0].value !== 0 &&
				dealerHand.map((card, index) => {
					return (
						<>
							{/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
							<div key={index} className="playing-card">
								<div>
									<div className="front-side">
										{card.value === 1
											? "Ace "
											: `${calcCardValue(card.value)} `}
										{card.suit}
									</div>
									<div className="back-side">
										{/* <img src="src/assets/backside_card.png" alt="" /> */}
										{card.value === 1
											? "Ace "
											: `${calcCardValue(card.value)} `}
										{card.suit}
									</div>
								</div>
							</div>
						</>
					);
				})}
		</div>
	);
};
