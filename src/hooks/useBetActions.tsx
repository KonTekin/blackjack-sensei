import { useContext } from "react";
import { PlayerContext } from "../context/player";

const useBetActions = () => {
	const { setPlayerBet, playerBalance } = useContext(PlayerContext);

	const increaseBet = () => {
		setPlayerBet((prevPlayerBet) => {
			return prevPlayerBet < playerBalance ? prevPlayerBet + 5 : prevPlayerBet;
		});
	};
	const decreaseBet = (amount: number) => {
		setPlayerBet((prevPlayerBet) => {
			return prevPlayerBet > amount ? prevPlayerBet - amount : 0;
		});
	};
	return { increaseBet, decreaseBet };
};

export default useBetActions;
