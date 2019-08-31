import React from 'react';

import Pokemon from '../../components/Pokemon';

import Api from '../../services/api';

import './styles/Pokemons.css';

class Pokemons extends React.Component {
	state = {
		fetching: true,
		next: null,
		count: 0,
		pokemons: [],
	}

	componentDidMount = () => {
		this.fetchData();
	}

	fetchData = async (url) => {
		this.setState({
			fetching: true,
		})
		const { data } = await Api.get(url || 'https://pokeapi.co/api/v2/pokemon');
		this.setState(prevState => ({
			fetching: false,
			next: data.next,
			count: data.count,
			pokemons: [...prevState.pokemons, ...data.results],
		}))
	}

	fetchNext = () => {
		this.fetchData(this.state.next);
	}

	render() {
		const { fetching, next, pokemons } = this.state;

		return (
			<section className="pokemons">
				{pokemons.map((pokemon, i) => <Pokemon key={`pokemon-${i}`} {...pokemon} />)}
				{next && !fetching &&
					<div className="pokemons-next" onClick={this.fetchNext}>Load More</div>
				}
			</section>
		)
	}
}

export default Pokemons;
