import { ReactNode } from "react";

export enum GameState {
	Init = "init",
	Betting = "betting",
	PlayerPlaying = "player playing",
	DealerPlaying = "dealer playing",
	AnalyzingRound = "analyzing round",
}
export enum BlackjackHand {
	Player = 0,
	Dealer = 1,
	Draw = 2,
	None = 3,
}

export enum Winner {
	Player = 0,
	Dealer = 1,
	Draw = 2,
}
export interface Props {
	children?: ReactNode;
	cards?: ICard[];
}

export interface ICard {
	suit: string;
	value: number;
	isHidden?: boolean;
}
export const blankHand: ICard = {
	suit: "none",
	value: 0,
};
