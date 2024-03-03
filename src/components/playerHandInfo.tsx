import { useContext } from "react";
import { PlayerContext } from "../context/player";
import styles from "../styles/playerHandInfo.module.css";
import { DealerContext } from "../context/dealer";

export const PlayerHandInfo = () => {
	const { playerBalance, playerHandValue } = useContext(PlayerContext);
	const { dealerHandValue } = useContext(DealerContext);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.card}>
					<div>Current Balance: {playerBalance}</div>
					<div>Player hand value: {playerHandValue}</div>
					<div>Dealer hand value: {dealerHandValue}</div>
				</div>
			</div>
		</>
	);
};
