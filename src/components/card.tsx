import { ICard } from "../constants";

import styles from "../styles/card.module.css";

export const Card: React.FC<ICard> = (card: ICard) => {
	const { value, suit, isHidden } = card;

	return (
		<div className={styles.playingCard}>
			<div className={styles.flipCard}>
				<div className={styles.frontSide}>
					<img
						src={
							isHidden
								? "src/assets/backside_card.png"
								: `src/assets/cards/${value}_of_${suit}.png`
						}
						alt={`${value} of ${suit}`}
					/>
				</div>
				)
				<div className={styles.backSide}>
					<img src={"src/assets/backside_card.png"} alt={"backside"} />
				</div>
			</div>
		</div>
	);
};
