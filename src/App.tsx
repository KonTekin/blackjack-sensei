import { useState, useContext, useEffect } from "react";
import { GameContext, ICard } from "./context/game";
import { PlayerContext } from "./context/player";
import "./App.css";

function App() {
	const [isFlipped] = useState(false);
	const game = useContext(GameContext);
	const player = useContext(PlayerContext);

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
	const increaseBet = () => {
		game.setPlayerBet((prevPlayerBet) => {
			return prevPlayerBet < player.playerBalance
				? prevPlayerBet + 5
				: prevPlayerBet;
		});
	};
	const decreaseBet = (amount: number) => {
		game.setPlayerBet((prevPlayerBet) => {
			return prevPlayerBet > amount ? prevPlayerBet - amount : 0;
		});
	};
	const dealInitialHands = () => {
		const start = game.currentPosOfGameDeck;
		const end = start + 4;
		const pHand: ICard[] = [];
		const dHand: ICard[] = [];

		for (let i = start; i < end; i++) {
			if (i % 2 === 0) {
				pHand.push(game.gameDeck[i]);
			} else {
				dHand.push(game.gameDeck[i]);
			}
		}
		game.setCurrentPosOfGameDeck(end);
		player.setPlayerHand(pHand);
		game.setDealerHand(dHand);
	};
	const handleBetAction = () => {
		dealInitialHands();
	};

	return (
		<div className="app-container">
			<div className="dealer-hand-container">
				{game.dealerHand[0].value !== 0 &&
					game.dealerHand.map(({ value, suit }) => {
						return (
							<div className="playing-card">
								<div
									className={isFlipped ? "flip-card deal-card" : "flip-card"}
								>
									<div className="front-side">
										{`${value} `}
										{suit}
									</div>
									<div className="back-side">
										{/* <img src="src/assets/backside_card.png" alt="" /> */}
										{`${value} `}
										{suit}
									</div>
								</div>
							</div>
						);
					})}
			</div>
			<div className="player-hand-container">
				{player.playerHand[0].value !== 0 &&
					player.playerHand.map(({ value, suit }) => {
						return (
							<div className="playing-card">
								<div
									className={isFlipped ? "flip-card deal-card" : "flip-card"}
								>
									<div className="front-side">
										{`${value} `}
										{suit}
									</div>
									<div className="back-side">
										{/* <img src="src/assets/backside_card.png" alt="" /> */}
										{`${value} `}
										{suit}
									</div>
								</div>
							</div>
						);
					})}
			</div>
			<div className="player-hit-hand-container">hit cards</div>
			<div className="card-deck-container">Deck of Cards</div>
			<div className="player-options-container">
				{player.isMakingBet && (
					<>
						<div className="bet-actions">
							<div>Current Balance: {player.playerBalance}</div>
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
