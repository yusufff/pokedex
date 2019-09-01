import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon';

import Api from '../../services/api';
import Local from '../../services/localStorage';

import { TypeColors } from '../../constants';

import './styles/Pokemon.css';

const Pokemon = ({ url }) => {
	const [loading, setLoading] = React.useState(true);
	const [onMyBall, setOnMyBall] = React.useState((Local.getItem('my-ball') || []).some(p => p.url === url));
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

	const addToMyBall = () => {
		if ( onMyBall ) {
			Local.setItem('my-ball', (Local.getItem('my-ball') || []).filter(p => p.url !== url))
			setOnMyBall(false)
		} else {
			Local.setItem('my-ball', [...(Local.getItem('my-ball') || []), { url }])
			setOnMyBall(true)
		}
	}

	return loading ? (
		<div className="pokemon">
			Loading...
		</div>
	) : (
		<div className={`pokemon ${onMyBall ? 'pokemon-onmyball' : ''}`}>
			<div className="pokemon-image">
				<img src={state.sprites.front_default} alt={state.name} />
				<div className="pokemon-ball" title={onMyBall ? 'Remove from My Poké Ball' : 'Add to My Poké Ball'} onClick={addToMyBall}>
					{onMyBall ?
						<Icon i="minus-circle" /> :
						<Icon i="plus-circle" />
					}
				</div>
			</div>
			<div className="pokemon-name">
				<Link to={`/pokemon/${state.id}`}>{state.name} - #{state.id}</Link>
			</div>
			<div className="pokemon-types">
				{state.types.map(({ type }, i) => (
					<div key={i} className="pokemon-type" style={{ '--typeColor': TypeColors[type.name] }}>{type.name}</div>
				))}
			</div>
			<div className="pokemon-stats">
				<span className="pokemon-stats-title">Abilities</span>
				<div className="pokemon-stats-list">{state.abilities.map(({ ability }) => ability.name.charAt(0).toUpperCase() + ability.name.slice(1)).join(', ')} </div>
			</div>
		</div>
	)
}

export default Pokemon;
