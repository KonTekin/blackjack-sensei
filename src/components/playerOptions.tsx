import { useContext, useEffect } from "react";
import { GameContext } from "../context/game";
import { PlayerContext } from "../context/player";
import { DealerContext } from "../context/dealer";
import styles from "../styles/playerOptions.module.css";
import { GameState, Winner } from "../constants";
import { displayEndOfRoundMessage } from "../utils/game_utils";
import useBetActions from "../hooks/useBetActions";
import useGameActions from "../hooks/useGameActions";
import useAnalyze from "../hooks/useAnalyze";

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
	const { resetRound, addCardToHand, dealInitialHands } = useGameActions();
	const { checkPlayerHandForBust, checkForRoundWinner, calculateHandValue } =
		useAnalyze();

	const handleBetAction = () => {
		if (playerBet > 0) {
			dealInitialHands();
			setPlayerBalance((prevPlayerBalance) => {
				return prevPlayerBalance - playerBet;
			});
			setGameState(GameState.PlayerPlaying);
			const currentHandValue = calculateHandValue(playerHand, true);
			setPlayerHandValue(currentHandValue);
		}
	};

	const handleHitAction = () => {
		addCardToHand({ isForPlayer: true });
		//calculate hand value
		const currentHandValue = calculateHandValue(playerHand, true);
		//set hand value
		setPlayerHandValue(currentHandValue);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps

	const handleStayAction = async () => {
		setGameState(GameState.DealerPlaying);
		const currentHandValue = calculateHandValue(dealerHand, false);
		setDealerHandValue(currentHandValue);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (gameState === GameState.PlayerPlaying) {
			const isBust = checkPlayerHandForBust();
			if (isBust) {
				displayEndOfRoundMessage(Winner.Dealer);
				setTimeout(() => resetRound(), 5000);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameState, playerHand, playerHandValue]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (gameState === GameState.DealerPlaying) {
			const currentHandValue = calculateHandValue(dealerHand, false);
			setDealerHandValue(currentHandValue);
			if (currentHandValue < 17) {
				setTimeout(() => addCardToHand({ isForPlayer: false }), 1000);
			} else {
				setGameState(GameState.AnalyzingRound);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dealerHand, dealerHandValue, GameState]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (gameState === GameState.AnalyzingRound) {
			const winner = checkForRoundWinner();
			if (winner === Winner.Player) {
				setPlayerBalance((prevPlayerBalance) => {
					return prevPlayerBalance + playerBet + playerBet;
				});
			}
			displayEndOfRoundMessage(winner);
			setTimeout(() => resetRound(), 5000);
		}
	}, [gameState]);

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
			{gameState === GameState.PlayerPlaying && playerHandValue < 22 && (
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
