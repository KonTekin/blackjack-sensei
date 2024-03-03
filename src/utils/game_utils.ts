import { ICard } from "../constants";

export const calcCardValue = (value: number): number => {
	if (value >= 10) return 10;
	return value;
};

export const calculateHandValue = (cards: ICard[]): number => {
	return cards.reduce((acc, card) => acc + calcCardValue(card.value), 0);
};

export const delay = async (duration: number) => {
	return new Promise((resolve) => setTimeout(resolve, duration));
};
