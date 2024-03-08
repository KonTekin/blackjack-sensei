import { useContext, useEffect } from "react";
import { GameContext } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import { toast } from "react-toastify";
import styles from "../styles/playerOptions.module.css";
import { GameState, ICard, blankHand } from "../constants";
import { calculateHandValue } from "../utils/game_utils";

export const PlayerOptions = () => {
	const {
		gameState,
		gameDeck,
		currentPosOfGameDeck,
		setCurrentPosOfGameDeck,
		setGameState,
		setGameDeck,
	} = useContext(GameContext);
	const {
		setPlayerBet,
		setPlayerBalance,
		setPlayerHand,
		setPlayerHandValue,
		playerBalance,
		playerHandValue,
		playerBet,
		playerHand,
	} = useContext(PlayerContext);
	const { setDealerHand, setDealerHandValue, dealerHandValue, dealerHand } =
		useContext(DealerContext);

	const handleBetAction = () => {
		if (playerBet > 0) {
			dealInitialHands();
			setPlayerBalance((prevPlayerBalance) => {
				return prevPlayerBalance - playerBet;
			});
			setGameState(GameState.PlayerPlaying);
		}
	};

	const handleHitAction = () => {
		const nextCard = gameDeck[currentPosOfGameDeck];
		setPlayerHand([...playerHand, nextCard]);
		setCurrentPosOfGameDeck((prevPos) => {
			return prevPos + 1;
		});
	};
	const dealInitialHands = () => {
		const count = 0;
		dealerHand.pop();
		playerHand.pop();

		for (let i = count; i < 4; i++) {
			if (i % 2 === 0) {
				const card = dealCard();
				dealerHand.push(card);
				setDealerHand(dealerHand);
			} else {
				const card = dealCard();
				playerHand.push(card);
				setPlayerHand(playerHand);
			}
		}
	};

	// Temp function need to refactor to deal card to any hand
	const dealCardForDealer = () => {
		const nextCard = gameDeck[currentPosOfGameDeck];
		setDealerHand((prevHand) => {
			return [...prevHand, nextCard];
		});
		setCurrentPosOfGameDeck((prevPos) => {
			return prevPos + 1;
		});
	};

	const dealCard = (): ICard => {
		// Todo: Need to add a check to see if deck is empty, if so then shuffle new deck
		const nextCard = gameDeck.pop();
		setGameDeck([...gameDeck]);

		return nextCard ? nextCard : { value: 0, suit: "empty" };
	};

	const resetRound = () => {
		setPlayerBet(0);
		setPlayerHandValue(0);
		setDealerHandValue(0);
		setGameState(GameState.Betting);
		setPlayerHand([blankHand]);
		setDealerHand([blankHand]);
	};

	const handleStayAction = async () => {
		setGameState(GameState.DealerPlaying);
		dealCardForDealer();
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
		if (gameState === GameState.PlayerPlaying) {
			// deal card to player hand
			//calculate hand value
			const currentHandValue = calculateHandValue(playerHand);
			//set hand value
			setPlayerHandValue(currentHandValue);
			//analyze hand for bust

			// if (currentHandValue === 21) {
			// 	toast.info("Player won!", {
			// 		position: "top-center",
			// 		autoClose: 2000,
			// 		hideProgressBar: false,
			// 		closeOnClick: true,
			// 		pauseOnHover: true,
			// 		draggable: true,
			// 		progress: undefined,
			// 		theme: "light",
			// 	});
			// 	resetRound();
			// }
			// if (currentHandValue > 21) {
			// 	toast.info("Player Lost", {
			// 		position: "top-center",
			// 		autoClose: 2000,
			// 		hideProgressBar: false,
			// 		closeOnClick: true,
			// 		pauseOnHover: true,
			// 		draggable: true,
			// 		progress: undefined,
			// 		theme: "light",
			// 	});
			// 	resetRound();
			// }
		}
	}, [playerHand]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (dealerHandValue < 17 && gameState === GameState.DealerPlaying) {
			dealCardForDealer();
			setTimeout(() => {
				return;
			}, 5000);
		}
		if (dealerHandValue > 21 && gameState === GameState.DealerPlaying) {
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
		if (dealerHandValue < 22 && gameState === GameState.DealerPlaying) {
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
	}, [dealerHand]);

	return (
		<div className={styles.container}>
			{gameState === GameState.Betting && (
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
			{gameState === GameState.PlayerPlaying && (
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
