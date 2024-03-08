import { ReactNode } from "react";

export enum GameState {
	Init = "init",
	Betting = "betting",
	PlayerPlaying = "player playing",
	DealerPlaying = "dealer playing",
	Win = "win",
	Lose = "lose",
	Draw = "draw",
}
export interface Props {
	children?: ReactNode;
}

export interface ICard {
	suit: string;
	value: number;
}
export const blankHand: ICard = {
	suit: "none",
	value: 0,
};
