import { BlackjackHand, Winner } from "../constants";
import { toast } from "react-toastify";

export const delay = async (duration: number) => {
	return await new Promise((resolve) => setTimeout(resolve, duration));
};

export const displayEndOfRoundMessage = (winner: Winner | BlackjackHand) => {
	switch (winner) {
		case Winner.Dealer || BlackjackHand.Dealer:
			toast.info("Dealer Won", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			break;

		case Winner.Player || BlackjackHand.Player:
			toast.info("Player won!", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			break;

		case Winner.Draw || BlackjackHand.Draw:
			toast.info("Draw", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			break;

		default:
			break;
	}
};
