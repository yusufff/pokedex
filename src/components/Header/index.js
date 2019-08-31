import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles/Header.css';

const Header = props => {
	return (
		<header className="header">
			<div className="logo">
				<NavLink exact to="/">POKEDEX</NavLink>
			</div>
			<nav className="nav">
				<NavLink exact to="/">Pokemons</NavLink>
				<NavLink exact to="/ball">My Poké Ball</NavLink>
			</nav>
		</header>
	)
}

export default Header;
