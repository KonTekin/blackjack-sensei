import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { GameContext } from "./context/game";
import { PlayerHand } from "./components/playerHand";
import { PlayerHandInfo } from "./components/playerHandInfo";
import { PlayerOptions } from "./components/playerOptions";
import { DealerHand } from "./components/dealerHand";
import { ToastContainer } from "react-toastify";

function App() {
	const game = useContext(GameContext);

	useEffect(() => {
		shuffleGameDeck();
	}, []);

	const shuffleGameDeck = () => {
		for (let i = game.gameDeck.length - 1; i > 0; i--) {
			// Generate random number
			const j = Math.floor(Math.random() * (i + 1));

			const temp = game.gameDeck[i];
			game.gameDeck[i] = game.gameDeck[j];
			game.gameDeck[j] = temp;
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
			<DealerHand />
			<PlayerHand />
			<PlayerHandInfo />
			<PlayerOptions />
			<div className="card-deck-container">Deck of Cards</div>
		</div>
	);
}

export default App;
