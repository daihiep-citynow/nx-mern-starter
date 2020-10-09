/**
 * Bind `this` to class methods
 * @param cls
 * @param thisVar
 */
export function bindThis(cls: any, thisVar: any) {
	try {
		const methods = Object.getOwnPropertyNames(cls.prototype);
		methods
			.filter((n) => {
				return !/(?:constructor|componentDidMount|render)/.test(n);
			})
			.forEach((m) => {
				// Members (getters/setters) shouldn't be bound
				if (typeof thisVar[m] === 'function') {
					thisVar[m] = thisVar[m].bind(thisVar);
				}
			});
	} catch (e) {
		console.error(e.message);
	}
}
