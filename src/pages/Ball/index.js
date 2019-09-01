import React from 'react';

import Pokemon from '../../components/Pokemon';

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

		return (
			<section className="pokemons">
				{pokemons.map(pokemon => <Pokemon key={`pokemon-${pokemon.url}`} {...pokemon} />)}
			</section>
		)
	}
}

export default Ball;
