import { useContext, useEffect } from "react";
import { GameContext } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import { toast } from "react-toastify";
import styles from "../styles/playerOptions.module.css";
import { GameState } from "../constants";
import { calculateHandValue } from "../utils/game_utils";
import useBetActions from "../hooks/useBetActions";
import useGameActions from "../hooks/useGameActions";

export const PlayerOptions = () => {
	const { gameState, setGameState } = useContext(GameContext);
	const {
		setPlayerBalance,
		setPlayerHandValue,
		playerHandValue,
		playerBet,
		playerHand,
	} = useContext(PlayerContext);
	const { setDealerHandValue, dealerHand, dealerHandValue } =
		useContext(DealerContext);

	const { increaseBet, decreaseBet } = useBetActions();
	const { resetRound, addCardToHand } = useGameActions();

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

	// eslint-disable-next-line react-hooks/exhaustive-deps

	const handleStayAction = async () => {
		setGameState(GameState.DealerPlaying);
		// addCardToHand({ isForPlayer: false });
		const currentHandValue = calculateHandValue(dealerHand);
		setDealerHandValue(currentHandValue);
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
			const currentHandValue = calculateHandValue(dealerHand);
			setDealerHandValue(currentHandValue);
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
			}, 5000);
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
				}, 5000);
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
				}, 5000);
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
