import { useContext, useEffect } from "react";
import { GameContext } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import { toast } from "react-toastify";
import styles from "../styles/playerOptions.module.css";
import { ICard, blankHand } from "../constants";

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
	const {
		isDealersTurn,
		setIsDealersTurn,
		setDealerHand,
		setDealerHandValue,
		dealerHandValue,
	} = useContext(DealerContext);

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
	const dealCardForDealer = () => {
		const nextCard = game.gameDeck[game.currentPosOfGameDeck];
		setDealerHand((prevHand) => {
			return [...prevHand, nextCard];
		});
		game.setCurrentPosOfGameDeck((prevPos) => {
			return prevPos + 1;
		});
	};

	const resetRound = () => {
		setIsPlayerTurn(false);
		setIsDealersTurn(false);
		setPlayerBet(0);
		setPlayerHandValue(0);
		setDealerHandValue(0);
		setIsMakingBet(true);
		setPlayerHand([blankHand]);
		setDealerHand([blankHand]);
	};

	const handleStayAction = async () => {
		setIsDealersTurn(true);
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (playerHandValue === 21) {
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
			resetRound();
		}
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (dealerHandValue < 17 && isDealersTurn) {
			dealCardForDealer();
			setTimeout(() => {
				return;
			}, 5000);
		}
		if (dealerHandValue > 21 && isDealersTurn) {
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
			setTimeout(() => {
				resetRound();
			}, 2000);
		}
		if (dealerHandValue < 22 && isDealersTurn) {
			if (dealerHandValue === 21) {
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
				setTimeout(() => {
					resetRound();
				}, 2000);
			}
			if (dealerHandValue >= 17 && dealerHandValue < 21) {
				if (dealerHandValue > playerHandValue) {
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
				setTimeout(() => {
					resetRound();
				}, 2000);
			}
		}
	}, [dealerHandValue, isDealersTurn]);

	return (
		<div className={styles.container}>
			{isMakingBet && (
				<>
					<div className={styles.inner}>
						<div className={styles.actions}>
							<button
								className={styles.playerAction}
								type="button"
								onClick={increaseBet}
							>
								+
							</button>
							<button
								className={styles.playerAction}
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
							className={styles.playerAction}
							onClick={handleHitAction}
						>
							Hit
						</button>
						<button
							type="button"
							className={styles.playerAction}
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
