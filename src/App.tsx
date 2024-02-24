import { useState, useContext, useEffect } from "react";
import { GameContext } from "./context/game";
import "./App.css";
import { DealerContext } from "./context/dealer";
import { PlayerHand } from "./components/playerHand";
import { calcCardValue } from "./utils/game_utils";
import { PlayerHandInfo } from "./components/playerHandInfo";
import { PlayerOptions } from "./components/playerOptions";

function App() {
	const [isFlipped] = useState(false);
	const game = useContext(GameContext);
	const dealer = useContext(DealerContext);

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
			<div className="dealer-hand-container">
				{dealer.dealerHand[0].value !== 0 &&
					dealer.dealerHand.map(({ value, suit }, index) => {
						return (
							<>
								{/* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */}
								<div key={index} className="playing-card">
									<div
										className={isFlipped ? "flip-card deal-card" : "flip-card"}
									>
										<div className="front-side">
											{value === 1 ? "Ace " : `${calcCardValue(value)} `}
											{suit}
										</div>
										<div className="back-side">
											{/* <img src="src/assets/backside_card.png" alt="" /> */}
											{value === 1 ? "Ace " : `${calcCardValue(value)} `}
											{suit}
										</div>
									</div>
								</div>
								<div>{dealer.dealerHandValue}</div>
							</>
						);
					})}
			</div>
			<PlayerHand />
			<PlayerHandInfo />
			<PlayerOptions />
			<div className="card-deck-container">Deck of Cards</div>
		</div>
	);
}

export default App;
