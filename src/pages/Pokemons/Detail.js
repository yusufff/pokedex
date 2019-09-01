import React from 'react';

import Icon from '../../components/Icon';
import Loading from '../../components/Loading';

import Api from '../../services/api';
import Local from '../../services/localStorage';

import { TypeColors } from '../../constants';

import './styles/Detail.css';

class Detail extends React.Component {
	state = {
		fetching: true,
		pokemon: [],
		myBall: Local.getItem('my-ball') || [],
	}

	componentDidMount = () => {
		this.fetchData();
	}

	fetchData = async () => {
		const { match } = this.props;
		this.setState({
			fetching: true,
		})
		const { data } = await Api.getPokemon(match.params.id);
		this.setState(prevState => ({
			fetching: false,
			pokemon: data,
		}))
	}

	addToMyBall = () => {
		const { pokemon, myBall } = this.state;
		if ( myBall.some(p => p.url === `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`) ) {
			Local.setItem('my-ball', myBall.filter(p => p.url !== `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`))
		} else {
			Local.setItem('my-ball', [...myBall, { url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/` }])
		}
		this.setState({ myBall: Local.getItem('my-ball') })
	}

	render() {
		const { fetching, pokemon, myBall } = this.state;

		const onMyBall = myBall.some(p => p.url === `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`)

		return fetching ? (
			<article className="pokemon-detail">
				<Loading />
			</article>
		) : (
			<article className="pokemon-detail">
				<div className={`pokemon ${onMyBall ? 'pokemon-onmyball' : ''}`}>
					<div className="pokemon-left">
						<div className="pokemon-image">
							<img src={pokemon.sprites.front_default} alt={pokemon.name} />
							<div className="pokemon-ball" title={onMyBall ? 'Remove from My Poké Ball' : 'Add to My Poké Ball'} onClick={this.addToMyBall}>
								{onMyBall ?
									<Icon i="minus-circle" /> :
									<Icon i="plus-circle" />
								}
							</div>
						</div>
						<div className="pokemon-name">{pokemon.name} - #{pokemon.id}</div>
						<div className="pokemon-types">
							{pokemon.types.map(({ type }, i) => (
								<div key={i} className="pokemon-type" style={{ '--typeColor': TypeColors[type.name] }}>{type.name}</div>
							))}
						</div>
					</div>
					<div className="pokemon-right">

						<div className="pokemon-stats">
							<span className="pokemon-stats-title">Abilities</span>
							<div className="pokemon-stats-list">{pokemon.abilities.map(({ ability }) => ability.name.charAt(0).toUpperCase() + ability.name.slice(1)).join(', ')} </div>
						</div>

						<div className="pokemon-stats">
							<span className="pokemon-stats-title">Items</span>
							<div className="pokemon-stats-list">{pokemon.held_items.map(({ item }) => item.name.charAt(0).toUpperCase() + item.name.slice(1)).join(', ')} </div>
						</div>

						<div className="pokemon-stats">
							<span className="pokemon-stats-title">Moves</span>
							<div className="pokemon-stats-list">{pokemon.moves.map(({ move }) => move.name.charAt(0).toUpperCase() + move.name.slice(1)).join(', ')} </div>
						</div>

					</div>
				</div>
			</article>
		)
	}
}

export default Detail;
