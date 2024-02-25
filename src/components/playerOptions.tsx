import { useContext } from "react";
import { GameContext, ICard, blankHand } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import { toast } from "react-toastify";

export const PlayerOptions = () => {
	const game = useContext(GameContext);
	const {
		setPlayerBet,
		setIsPlayerTurn,
		setPlayerBalance,
		setIsMakingBet,
		setPlayerHand,
		setPlayerHandValue,
		playerBalance,
		playerHandValue,
		playerBet,
		playerHand,
		isMakingBet,
		isPlayerTurn,
	} = useContext(PlayerContext);
	const { setDealerHand, setDealerHandValue, dealerHandValue } =
		useContext(DealerContext);

	const handleBetAction = () => {
		if (playerBet > 0) {
			dealInitialHands();
			setPlayerBalance((prevPlayerBalance) => {
				return prevPlayerBalance - playerBet;
			});
			setPlayerBet(0);
			setIsPlayerTurn(true);
			setIsMakingBet(false);
		}
	};

	const handleHitAction = () => {
		const nextCard = game.gameDeck[game.currentPosOfGameDeck];
		setPlayerHand([...playerHand, nextCard]);
		game.setCurrentPosOfGameDeck(++game.currentPosOfGameDeck);

		// setPlayerHandValue((prev) => {
		// 	return prev + calcCardValue(nextCard.value);
		// });
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
		setPlayerHand(pHand);
		setDealerHand(dHand);
	};
	const dealCardForDealer = (): number => {
		const nextCard = game.gameDeck[game.currentPosOfGameDeck];
		setDealerHand((prevHand) => {
			return [...prevHand, nextCard];
		});
		game.setCurrentPosOfGameDeck((prev) => {
			return prev + 1;
		});

		return dealerHandValue + nextCard.value;
	};

	const resetRound = () => {
		setIsPlayerTurn(false);
		setPlayerBet(0);
		setPlayerHandValue(0);
		setDealerHandValue(0);
		setIsMakingBet(true);
		setPlayerHand([blankHand]);
		setDealerHand([blankHand]);
	};

	const handleStayAction = async () => {
		let handValue = dealerHandValue;

		while (handValue < 17) {
			console.log(handValue);
			handValue = dealCardForDealer();
			await new Promise((resolve) => setTimeout(resolve, 1500));
		}

		if (handValue > 21) {
			toast.info("Dealer Busted", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			console.log("player won");

			setPlayerBalance((prevPlayerBalance) => {
				return prevPlayerBalance + playerBet;
			});
		} else if (handValue >= 17 && handValue <= 21) {
			// evaluate player and dealer hand value to see who wins
			if (handValue > playerHandValue) {
				console.log("player dealer won");

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
			} else {
				console.log("player won");
				toast.info("Player Won", {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				setPlayerBalance((prevPlayerBalance) => {
					return prevPlayerBalance + playerBet;
				});
			}
		}
		resetRound();
	};

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

	return (
		<div className="player-options-container">
			{isMakingBet && (
				<>
					<div className="bet-actions">
						<button type="button" onClick={increaseBet}>
							increase
						</button>
						<div>{playerBet}</div>
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
			{isPlayerTurn && (
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
		</div>
	);
};
