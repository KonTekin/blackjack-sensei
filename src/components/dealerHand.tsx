import { useContext, useEffect } from "react";
import { calculateHandValue } from "../utils/game_utils";
import { DealerContext } from "../context/dealer";
import { Card } from "./card";
import { nanoid } from "nanoid";

export const DealerHand = () => {
	const { dealerHand, setDealerHandValue } = useContext(DealerContext);

	useEffect(() => {
		const totalHandValue = calculateHandValue(dealerHand);
		setDealerHandValue(totalHandValue);
	}, [dealerHand, setDealerHandValue]);

	return (
		<div className="dealer-hand-container">
			{dealerHand[0].value !== 0 &&
				dealerHand.map(({ value, suit }) => {
					const cardId = nanoid();
					return <Card key={cardId} value={value} suit={suit} />;
				})}
		</div>
	);
};
