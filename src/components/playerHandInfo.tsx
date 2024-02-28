import { useContext } from "react";
import { PlayerContext } from "../context/player";
import styles from "../styles/playerHandInfo.module.css";

export const PlayerHandInfo = () => {
	const { playerBalance, playerHandValue } = useContext(PlayerContext);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.card}>
					<div>Current Balance: {playerBalance}</div>
					<div>Player hand value: {playerHandValue}</div>
				</div>
			</div>
		</>
	);
};
