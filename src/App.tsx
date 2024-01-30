import { useState } from 'react';
import './App.css';

function App() {
	const [isFlipped, setIsFlipped] = useState(false);
	return (
		<>
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

			<div className='player-hand'></div>

			<button className='general-btn' onClick={() => setIsFlipped(!isFlipped)}>
				Flip
			</button>
		</>
	);
}

export default App;
