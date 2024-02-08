import { useState } from 'react';
import './App.css';

function App() {
	const [isFlipped, setIsFlipped] = useState(false);
	return (
		<div className='app-container'>
			<div className='dealer-hand-container'>Dealer hand</div>
			<div className='player-hand-container'>
				<div className='playing-card'>
					<div className={isFlipped ? `flip-card deal-card` : `flip-card`}>
						<div className='front-side'>
							<img src='src/assets/ace_clubs.png' alt='' />
						</div>
						<div className='back-side'>
							<img src='src/assets/backside_card.png' alt='' />
						</div>
					</div>
				</div>
			</div>
			<div className='player-hit-hand-container'>hit cards</div>
			<div className='card-deck-container'>Deck of Cards</div>
			<div className='player-options-container'>
				<button className='general-btn' onClick={() => setIsFlipped(!isFlipped)}>
					Flip
				</button>
			</div>
		</div>
	);
}

export default App;
