import { createContext, Dispatch, SetStateAction, useState } from "react";
import { blankHand, ICard, Props } from "./game";

interface IDealerContext {
	dealerHand: ICard[];
	setDealerHand: Dispatch<SetStateAction<ICard[]>>;
}

export const DealerContext = createContext<IDealerContext>({
	dealerHand: [],
	setDealerHand: () => {},
});

export const DealerProvider = ({ children }: Props) => {
	const [dealerHand, setDealerHand] = useState([blankHand]);

	const value = {
		dealerHand,
		setDealerHand,
	};

	return (
		<DealerContext.Provider value={value}>{children}</DealerContext.Provider>
	);
};
