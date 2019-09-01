import React from 'react';
import { Link } from 'react-router-dom';

import Pokemon from '../../components/Pokemon';
import Icon from '../../components/Icon';

import Local from '../../services/localStorage';

import './styles/Ball.css';

class Ball extends React.Component {
	state = {
		pokemons: Local.getItem('my-ball') || [],
	}

	unlisten = null

	componentDidMount = () => {
		this.unlisten = Local.listen('my-ball', () => {
			this.setState({
				pokemons: Local.getItem('my-ball') || [],
			})
		})
	}

	componentWillUnmount = () => {
		this.unlisten && this.unlisten();
	}

	render() {
		const { pokemons } = this.state;

		return pokemons.length === 0 ? (
			<section className="pokemons">
				<div className="pokemons-empty">
					<Icon i="life-buoy" size={100} />
					<Link to="/">Start adding some Pokémons to your Poké Ball!</Link>
				</div>
			</section>
		) : (
			<section className="pokemons">
				{pokemons.map(pokemon => <Pokemon key={`pokemon-${pokemon.url}`} {...pokemon} />)}
			</section>
		)
	}
}

export default Ball;
