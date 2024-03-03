import styles from "../styles/card.module.css";
import { calcCardValue } from "../utils/game_utils";

interface CardProps {
	value: number;
	suit: string;
}

export const Card: React.FC<CardProps> = ({ value, suit }) => {
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
					{value === 1 ? "Ace " : `${calcCardValue(value)} `} of {suit}
				</div>
			</div>
		</div>
	);
};
