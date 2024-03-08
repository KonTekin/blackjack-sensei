import { useContext } from "react";

import { DealerContext } from "../context/dealer";
import { Card } from "./card";
import { nanoid } from "nanoid";

export const DealerHand = () => {
	const { dealerHand } = useContext(DealerContext);
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
