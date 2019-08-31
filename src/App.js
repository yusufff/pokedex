import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';

import Pokemons from './pages/Pokemons';
import Pokemon from './pages/Pokemons/Detail';
import Ball from './pages/Ball';

import './App.css';

function App() {
	return (
		<div className="App">
			<Header />
			
			<Route exact path="/" component={Pokemons} />
			<Route path="/pokemon/:id" component={Pokemon} />
			<Route path="/ball" component={Ball} />
		</div>
	);
}

export default App;
