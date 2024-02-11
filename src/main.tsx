import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { GameProvider } from "./context/game";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GameProvider>
			<App />
		</GameProvider>
	</React.StrictMode>,
);
