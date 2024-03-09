import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { GameContext } from "./context/game";
import { PlayerHandInfo } from "./components/playerHandInfo";
import { PlayerOptions } from "./components/playerOptions";
import { ToastContainer } from "react-toastify";
import { Hand } from "./components/hand";
import { PlayerContext } from "./context/player";
import { DealerContext } from "./context/dealer";

function App() {
	const { gameDeck } = useContext(GameContext);
	const { playerHand } = useContext(PlayerContext);
	const { dealerHand } = useContext(DealerContext);

	useEffect(() => {
		shuffleGameDeck();
	}, []);

	const shuffleGameDeck = () => {
		for (let i = gameDeck.length - 1; i > 0; i--) {
			// Generate random number
			const j = Math.floor(Math.random() * (i + 1));

			const temp = gameDeck[i];
			gameDeck[i] = gameDeck[j];
			gameDeck[j] = temp;
		}
	};
	return (
		<div className="app-container">
			<ToastContainer
				position="top-center"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{/* <DealerHand />
			<PlayerHand /> */}
			<Hand cards={playerHand} isPlayerHand={true} />
			<Hand cards={dealerHand} isPlayerHand={false} />
			<PlayerHandInfo />
			<PlayerOptions />

			{/* <div className="card-deck-container">Deck of Cards</div> */}
		</div>
	);
}

export default App;
