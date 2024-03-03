import { createContext, Dispatch, SetStateAction, useState } from "react";
import { blankHand, ICard, Props } from "../constants";

interface IDealerContext {
	dealerHand: ICard[];
	dealerHandValue: number;
	isDealersTurn: boolean;
	setDealerHand: Dispatch<SetStateAction<ICard[]>>;
	setDealerHandValue: Dispatch<SetStateAction<number>>;
	setIsDealersTurn: Dispatch<SetStateAction<boolean>>;
}

export const DealerContext = createContext<IDealerContext>({
	dealerHand: [],
	isDealersTurn: false,
	dealerHandValue: 0,
	setDealerHand: () => {},
	setDealerHandValue: () => {},
	setIsDealersTurn: () => {},
});

export const DealerProvider = ({ children }: Props) => {
	const [dealerHand, setDealerHand] = useState([blankHand]);
	const [dealerHandValue, setDealerHandValue] = useState(0);
	const [isDealersTurn, setIsDealersTurn] = useState(false);

	const value = {
		dealerHand,
		dealerHandValue,
		isDealersTurn,
		setDealerHand,
		setDealerHandValue,
		setIsDealersTurn,
	};

	return (
		<DealerContext.Provider value={value}>{children}</DealerContext.Provider>
	);
};
