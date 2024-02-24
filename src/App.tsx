import { useState, useContext, useEffect } from "react";
import { GameContext, ICard, blankHand } from "./context/game";
import { PlayerContext } from "./context/player";
import "./App.css";
import { DealerContext } from "./context/dealer";
import { PlayerHand } from "./components/playerHand";
import { calcCardValue } from "./utils/game_utils";

function App() {
	const [isFlipped] = useState(false);
	const game = useContext(GameContext);
	const player = useContext(PlayerContext);
	const dealer = useContext(DealerContext);
	const [dealerHandValue, setDealerHandValue] = useState(0);
	const [playerHandValue, setPlayerHandValue] = useState(0);

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
				setPlayerHandValue((prev) => {
					return prev + game.gameDeck[i].value;
				});
			} else {
				dHand.push(game.gameDeck[i]);
				setDealerHandValue((prev) => {
					return prev + game.gameDeck[i].value;
				});
			}
		}
		game.setCurrentPosOfGameDeck(end);
		player.setPlayerHand(pHand);
		dealer.setDealerHand(dHand);
	};
	const handleBetAction = () => {
		if (game.playerBet > 0) {
			dealInitialHands();
			player.setPlayerBalance((prevPlayerBalance) => {
				return prevPlayerBalance - game.playerBet;
			});
			game.setPlayerBet(0);
			game.setIsPlayerTurn(true);
			player.setIsMakingBet(false);
		}
	};

	const handleHitAction = () => {
		const nextCard = game.gameDeck[game.currentPosOfGameDeck];
		player.setPlayerHand([...player.playerHand, nextCard]);
		game.setCurrentPosOfGameDeck(++game.currentPosOfGameDeck);

		setPlayerHandValue((prev) => {
			return prev + nextCard.value;
		});
	};

	const handleStayAction = async () => {
		console.log(dealerHandValue);

		while (dealerHandValue < 17) {
			await dealCardForDealer();
			await new Promise((resolve) => setTimeout(resolve, 1500));
		}

		if (dealerHandValue > 21) {
			alert("Dealer bust");
		} else if (dealerHandValue >= 17 && dealerHandValue <= 21) {
			// evaluate player and dealer hand value to see who wins
			if (dealerHandValue > playerHandValue) {
				alert("Dealer wins");
			} else {
				alert("player wins");
				player.setPlayerBalance((prevPlayerBalance) => {
					return prevPlayerBalance + game.playerBet;
				});
			}
			//reset state for new round
		}
		resetRound();
	};

	const dealCardForDealer = async () => {
		const nextCard = game.gameDeck[game.currentPosOfGameDeck];
		dealer.setDealerHand((prevHand) => {
			return [...prevHand, nextCard];
		});
		game.setCurrentPosOfGameDeck(++game.currentPosOfGameDeck);
		setDealerHandValue((prev) => {
			return prev + nextCard.value;
		});
	};

	const resetRound = () => {
		game.setIsPlayerTurn(false);
		game.setPlayerBet(0);
		player.setIsMakingBet(true);
		player.setPlayerHand([blankHand]);
		dealer.setDealerHand([blankHand]);
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
								<div>{dealerHandValue}</div>
							</>
						);
					})}
			</div>
			<PlayerHand />
			<div className="card-deck-container">Deck of Cards</div>
			<div className="player-options-container">
				<div>Current Balance: {player.playerBalance}</div>
				<div>Player hand value: {playerHandValue}</div>

				{player.isMakingBet && (
					<>
						<div className="bet-actions">
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
				{game.isPlayerTurn && (
					<>
						<div>
							<button
								type="button"
								className="general-btn"
								onClick={handleHitAction}
							>
								Hit
							</button>
							<button
								type="button"
								className="general-btn"
								onClick={handleStayAction}
							>
								Stay
							</button>
						</div>
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
