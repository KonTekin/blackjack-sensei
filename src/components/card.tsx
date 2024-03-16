import { ICard } from "../constants";
import useAnalyze from "../hooks/useAnalyze";
import styles from "../styles/card.module.css";

export const Card: React.FC<ICard> = (
	card: ICard,
	isFromPlayerHand: boolean,
) => {
	const { value, suit } = card;

	const { calcCardValue } = useAnalyze();
	return (
		<div className={styles.playingCard}>
			<div className={styles.flipCard}>
				<div className={styles.frontSide}>
					<img
						src={`src/assets/cards/${value}_of_${suit}.png`}
						alt={`${value} of ${suit}`}
					/>
				</div>
				<div className={styles.backSide}>
					{value === 1
						? "Ace "
						: `${calcCardValue({ card, isFromPlayerHand })} `}{" "}
					of {suit}
				</div>
			</div>
		</div>
	);
};
