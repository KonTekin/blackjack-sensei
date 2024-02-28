import { useContext, useEffect } from "react";
import { GameContext, ICard, blankHand } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import { toast } from "react-toastify";
import styles from "../styles/playerOptions.module.css";

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
			setIsPlayerTurn(true);
			setIsMakingBet(false);
		}
	};

	useEffect(() => {
		if (playerHandValue > 21) {
			toast.info("Player Lost", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			resetRound();
		}
	}, [playerHandValue]);

	const handleHitAction = () => {
		const nextCard = game.gameDeck[game.currentPosOfGameDeck];
		setPlayerHand([...playerHand, nextCard]);
		game.setCurrentPosOfGameDeck(++game.currentPosOfGameDeck);
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
			toast.info("Dealer Lost", {
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
				return prevPlayerBalance + playerBet + playerBet;
			});
		} else if (handValue >= 17 && handValue <= 21) {
			// evaluate player and dealer hand value to see who wins
			if (handValue > playerHandValue) {
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
					return prevPlayerBalance + playerBet + playerBet;
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
		<div className={styles.container}>
			{isMakingBet && (
				<>
					<div className={styles.inner}>
						<div className={styles.actions}>
							<button
								className={styles.arrow}
								type="button"
								onClick={increaseBet}
							>
								+
							</button>
							<button
								className={styles.arrow}
								type="button"
								onClick={() => decreaseBet(5)}
							>
								-
							</button>
						</div>
						<div className={styles.amount}>{playerBet}</div>
					</div>
					<button
						type="button"
						className={styles.bet}
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
