import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PublicWebRutes from './routes/PublicWebRutes';
import BackOfficeRutes from './routes/BackOfficeRutes';
import TransitionSwitch from './shared/TransitionSwitch';

function App() {
	return (
		<BrowserRouter>
			<TransitionSwitch>
				<Route>
					<PublicWebRutes />
					<BackOfficeRutes />
				</Route>
			</TransitionSwitch>
		</BrowserRouter>
	);
}

export default App;
