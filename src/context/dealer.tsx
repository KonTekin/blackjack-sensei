import { createContext, Dispatch, SetStateAction, useState } from "react";
import { blankHand, ICard, Props } from "./game";

interface IDealerContext {
	dealerHand: ICard[];
	dealerHandValue: number;
	setDealerHand: Dispatch<SetStateAction<ICard[]>>;
	setDealerHandValue: Dispatch<SetStateAction<number>>;
}

export const DealerContext = createContext<IDealerContext>({
	dealerHand: [],
	dealerHandValue: 0,
	setDealerHand: () => {},
	setDealerHandValue: () => {},
});

export const DealerProvider = ({ children }: Props) => {
	const [dealerHand, setDealerHand] = useState([blankHand]);
	const [dealerHandValue, setDealerHandValue] = useState(0);

	const value = {
		dealerHand,
		dealerHandValue,
		setDealerHand,
		setDealerHandValue,
	};

	return (
		<DealerContext.Provider value={value}>{children}</DealerContext.Provider>
	);
};
