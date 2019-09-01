class Local {
	constructor() {
		this.item = 'pokedex';
		this.storage = window.localStorage;
		this.listeners = [];
		this.cache = null;

		if ( this.storage.getItem(this.item) === null )
			this.setStore({});
	}

	setStore(store) {
		this.cache = store;
		return this.storage.setItem(this.item, JSON.stringify(store));
	}

	getStore() {
		if (this.cache) {
			return this.cache;
		}

		return JSON.parse(this.storage.getItem(this.item));
	}

	setItem(key, value) {
		const store = this.getStore();
		const newStore = {
			...store,
			[key]: value
		};
		this.setStore(newStore);
		this.tell(key, value);
		return newStore;
	}

	getItem(key) {
		const store = this.getStore();
		return store[key];
	}

	removeItem(key) {
		const store = this.getStore();
		delete store[key];
		return this.setStore(store);
	}

	listen(key, cb) {
		const index = this.listeners.push({
			key,
			cb
		});

		return () => { this.unlisten(index - 1) }
	}

	unlisten(index) {
		this.listeners.splice(index, 1);
	}

	tell(key, value) {
		this.listeners.forEach(item => {
			if ( item.key === key )
				return item.cb(value)
		})
	}
}

export default new Local();
