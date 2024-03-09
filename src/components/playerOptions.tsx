import { useContext, useEffect } from "react";
import { GameContext } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import { toast } from "react-toastify";
import styles from "../styles/playerOptions.module.css";
import { GameState, ICard, blankHand } from "../constants";
import { calculateHandValue } from "../utils/game_utils";

export const PlayerOptions = () => {
	const { gameState, gameDeck, setGameState, setGameDeck } =
		useContext(GameContext);
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
	const { setDealerHand, setDealerHandValue, dealerHand, dealerHandValue } =
		useContext(DealerContext);

	const handleBetAction = () => {
		if (playerBet > 0) {
			dealInitialHands();
			setPlayerBalance((prevPlayerBalance) => {
				return prevPlayerBalance - playerBet;
			});
			setGameState(GameState.PlayerPlaying);
			const currentHandValue = calculateHandValue(playerHand);
			setPlayerHandValue(currentHandValue);
		}
	};

	const handleHitAction = () => {
		addCardToHand({ isForPlayer: true });
		//calculate hand value
		const currentHandValue = calculateHandValue(playerHand);
		//set hand value
		setPlayerHandValue(currentHandValue);
	};
	const dealInitialHands = () => {
		const count = 0;
		dealerHand.pop();
		playerHand.pop();

		for (let i = count; i < 4; i++) {
			if (i % 2 === 0) {
				addCardToHand({ isForPlayer: false });
			} else {
				addCardToHand({ isForPlayer: true });
			}
		}
		const currentDealerHandValue = calculateHandValue(dealerHand);
		setDealerHandValue(currentDealerHandValue);

		const currentPlayerHandValue = calculateHandValue(playerHand);
		setPlayerHandValue(currentPlayerHandValue);
	};

	// Temp function need to refactor to deal card to any hand
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const addCardToHand = ({ isForPlayer }: { isForPlayer: boolean }) => {
		const nextCard = dealCard();
		if (isForPlayer) {
			playerHand.push(nextCard);
			setPlayerHand(playerHand);
		} else {
			dealerHand.push(nextCard);
			setDealerHand(dealerHand);
		}
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
		addCardToHand({ isForPlayer: false });
		const currentHandValue = calculateHandValue(dealerHand);
		setDealerHandValue(currentHandValue);
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
			//analyze hand for bust
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameState, playerHand, playerHandValue]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (dealerHandValue < 17 && gameState === GameState.DealerPlaying) {
			addCardToHand({ isForPlayer: false });

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dealerHand, gameState, dealerHandValue]);

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
