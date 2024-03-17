import { Card } from "./card";
import { nanoid } from "nanoid";
import { ICard } from "../constants";
import { useContext, useEffect } from "react";
import { DealerContext } from "../context/dealer";

interface HandProps {
	cards: ICard[];
	isPlayerHand: boolean;
}

export const Hand: React.FC<HandProps> = ({ cards, isPlayerHand }) => {
	const { dealerHand } = useContext(DealerContext);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {}, [dealerHand]);
	return (
		<div
			className={
				isPlayerHand ? "player-hand-container" : "dealer-hand-container"
			}
		>
			{cards[0].value !== 0 &&
				cards.map(({ value, suit, isHidden }) => {
					const cardId = nanoid();
					return (
						<Card key={cardId} value={value} suit={suit} isHidden={isHidden} />
					);
				})}
		</div>
	);
};
