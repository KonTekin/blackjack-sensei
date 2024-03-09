import { Card } from "./card";
import { nanoid } from "nanoid";
import { ICard } from "../constants";

interface HandProps {
	cards: ICard[];
	isPlayerHand: boolean;
}

export const Hand: React.FC<HandProps> = ({ cards, isPlayerHand }) => {
	return (
		<div
			className={
				isPlayerHand ? "player-hand-container" : "dealer-hand-container"
			}
		>
			{cards[0].value !== 0 &&
				cards.map(({ value, suit }) => {
					const cardId = nanoid();
					return <Card key={cardId} value={value} suit={suit} />;
				})}
		</div>
	);
};
