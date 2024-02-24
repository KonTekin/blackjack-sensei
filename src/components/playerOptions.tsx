import { useContext } from "react";
import { GameContext, ICard, blankHand } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";

export const PlayerOptions = () => {
	const game = useContext(GameContext);
	const player = useContext(PlayerContext);
	const dealer = useContext(DealerContext);

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

		player.setPlayerHandValue((prev) => {
			return prev + nextCard.value;
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
				player.setPlayerHandValue((prev) => {
					return prev + game.gameDeck[i].value;
				});
			} else {
				dHand.push(game.gameDeck[i]);
				dealer.setDealerHandValue((prev) => {
					return prev + game.gameDeck[i].value;
				});
			}
		}
		game.setCurrentPosOfGameDeck(end);
		player.setPlayerHand(pHand);
		dealer.setDealerHand(dHand);
	};
	const dealCardForDealer = async () => {
		const nextCard = game.gameDeck[game.currentPosOfGameDeck];
		dealer.setDealerHand((prevHand) => {
			return [...prevHand, nextCard];
		});
		game.setCurrentPosOfGameDeck(++game.currentPosOfGameDeck);
		dealer.setDealerHandValue((prev) => {
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

	const handleStayAction = async () => {
		console.log(dealer.dealerHandValue);
		while (dealer.dealerHandValue < 17) {
			await dealCardForDealer();
			await new Promise((resolve) => setTimeout(resolve, 1500));
		}
		if (dealer.dealerHandValue > 21) {
			alert("Dealer bust");
		} else if (dealer.dealerHandValue >= 17 && dealer.dealerHandValue <= 21) {
			// evaluate player and dealer hand value to see who wins
			if (dealer.dealerHandValue > player.playerHandValue) {
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

	return (
		<div className="player-options-container">
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
	);
};
