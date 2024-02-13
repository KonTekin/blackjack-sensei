import { useState, useContext } from "react";
import { GameContext } from "./context/game";
import "./App.css";

function App() {
	const [isFlipped] = useState(false);
	const game = useContext(GameContext);
	const handleBetAction = () => {};
	const increaseBet = () => {
		game.setPlayerBet((prevPlayerBet) => {
			return prevPlayerBet < game.playerBalance
				? prevPlayerBet + 5
				: prevPlayerBet;
		});
	};
	const decreaseBet = (amount: number) => {
		game.setPlayerBet((prevPlayerBet) => {
			return prevPlayerBet > amount ? prevPlayerBet - amount : 0;
		});
	};
	return (
		<div className="app-container">
			<div className="dealer-hand-container">Dealer hand</div>
			<div className="player-hand-container">
				<div className="playing-card">
					<div className={isFlipped ? "flip-card deal-card" : "flip-card"}>
						<div className="front-side">
							<img src="src/assets/ace_clubs.png" alt="" />
						</div>
						<div className="back-side">
							<img src="src/assets/backside_card.png" alt="" />
						</div>
					</div>
				</div>
				<div className="playing-card">
					<div className={isFlipped ? "flip-card deal-card" : "flip-card"}>
						<div className="front-side">
							<img src="src/assets/ace_clubs.png" alt="" />
						</div>
						<div className="back-side">
							<img src="src/assets/backside_card.png" alt="" />
						</div>
					</div>
				</div>
			</div>
			<div className="player-hit-hand-container">hit cards</div>
			<div className="card-deck-container">Deck of Cards</div>
			<div className="player-options-container">
				{game.isMakingBet && (
					<>
						<div className="bet-actions">
							<div>Current Balance: {game.playerBalance}</div>
							<button type="button" onClick={increaseBet}>
								increase
							</button>
							<div>{game.playerBet}</div>
							<button type="button" onClick={() => decreaseBet(5)}>
								decrease
							</button>
						</div>
						<button
							type="button"
							className="general-btn"
							onClick={handleBetAction}
						>
							Place Bet
						</button>
					</>
				)}
				{/* <button
					type="button"
					className="general-btn"
					onClick={() => setIsFlipped(!isFlipped)}
				>
					Flip
				</button> */}
			</div>
		</div>
	);
}

export default App;
