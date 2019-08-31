import React from 'react';

import Api from '../../services/api';

import './styles/Pokemon.css';

const TypeColors = {
	normal: '#EF5350',
	fighting: '#ec407a',
	flying: '#ab47bc',
	poison: '#7e57c2',
	ground: '#5c6bc0',
	rock: '#42a5f5',
	bug: '#29b6f6',
	ghost: '#C4D0D6',
	steel: '#26c6da',
	fire: '#26a69a',
	water: '#66bb6a',
	grass: '#9ccc65',
	electric: '#d4e157',
	psychic: '#ffee58',
	ice: '#ffca28',
	dragon: '#ffa726',
	dark: '#ff7043',
	fairy: '#8d6e63',
	unknown: '#bdbdbd',
	shadow: '#78909c',
}

const Pokemon = ({ name, url }) => {
	const [loading, setLoading] = React.useState(true);
	const [state, setState] = React.useState({});

	React.useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const pokemon = await Api.get(url);
			setState(pokemon.data);
			setLoading(false);
		}
		fetchData();
	}, [url]);

	return loading ? (
		<div className="pokemon">
			Loading...
		</div>
	) : (
		<div className="pokemon">
			<div className="pokemon-image">
				<img src={state.sprites.front_default} alt={state.name || name} />
			</div>
			<div className="pokemon-name">{state.name} - #{state.id}</div>
			<div className="pokemon-types">
				{state.types.map(({ type }, i) => (
					<div key={i} className="pokemon-type" style={{ '--typeColor': TypeColors[type.name] }}>{type.name}</div>
				))}
			</div>
			<div className="pokemon-abilities">
				<span className="pokemon-stats-title">Abilities</span>
				<div className="pokemon-ability-list">{state.abilities.map(({ ability }) => ability.name.charAt(0).toUpperCase() + name.slice(1)).join(', ')} </div>
			</div>
		</div>
	)
}

export default Pokemon;
