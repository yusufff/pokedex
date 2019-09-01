import React from 'react';

import Pokemon from '../../components/Pokemon';
import Icon from '../../components/Icon';
import Loading from '../../components/Loading';

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
				{pokemons.map(pokemon => <Pokemon key={`pokemon-${pokemon.url}`} {...pokemon} />)}
				{next && !fetching &&
					<div className="pokemons-next" onClick={this.fetchNext}>
						<Icon i="arrow-down-circle" size={40} />
						<span>Load More</span>
					</div>
				}
				{fetching && <Loading />}
			</section>
		)
	}
}

export default Pokemons;
