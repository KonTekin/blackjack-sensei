import './App.css';

function App() {
	return (
		<>
			<img src='assets/backside_card' alt='' />

			<div className='playing-card'>
				<div className='flip-card'>
					<div className='front-side'>
						<img src='src/assets/ace_clubs.png' alt='' />
					</div>
					<div className='back-side'>
						<img src='src/assets/backside_card.png' alt='' />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
