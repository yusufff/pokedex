import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '../Icon';

import Local from '../../services/localStorage';

import './styles/Header.css';

const Header = props => {
	const [myBall, setMyBall] = React.useState(Local.getItem('my-ball') || []);
	Local.listen('my-ball', () => {
		setMyBall(Local.getItem('my-ball') || []);
	})

	return (
		<header className="header">
			<div className="logo">
				<NavLink exact to="/">POKEDEX</NavLink>
			</div>
			<nav className="nav">
				<NavLink exact to="/">
					<Icon i="home" size={18} />
					<span>Pokemons</span>
				</NavLink>
				<NavLink exact to="/ball">
					<Icon i="life-buoy" size={18} />
					<span>My Poké Ball</span>
					<i className="my-ball-count">{myBall.length}</i>
				</NavLink>
			</nav>
		</header>
	)
}

export default Header;
