import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { GameProvider } from "./context/game";
import "./index.css";
import { PlayerProvider } from "./context/player";
import { DealerProvider } from "./context/dealer";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GameProvider>
			<PlayerProvider>
				<DealerProvider>
					<App />
				</DealerProvider>
			</PlayerProvider>
		</GameProvider>
	</React.StrictMode>,
);
