import localforage from 'localforage';
import { setup } from 'axios-cache-adapter'

class Api {
	constructor() {
		const forageStore = localforage.createInstance({
			driver: [
				localforage.INDEXEDDB,
			],
			name: 'pokedex-cache'
		});

		this.api = setup({
			cache: {
				store: forageStore,
        maxAge: 30 * 60 * 1000,
        exclude: {
          query: false
        },
    	},
		});

		this.api.defaults.headers['Content-Type'] = 'application/json';
	}

	/**
	 * Generic
	 */
	get(url, params) {
		return this.api.get(url, { params });
	}

	/**
	 * Pokemons
	 */
	getPokemons(params) {
		return this.api.get('https://pokeapi.co/api/v2/pokemon', { params });
	}
	getPokemon(name, params) {
		return this.api.get(`https://pokeapi.co/api/v2/pokemon/${name}`, { params });
	}
}

export default new Api();
