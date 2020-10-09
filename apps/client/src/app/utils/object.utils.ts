/**
 * Bind this to class methods. ignoreMethods should be used for any getters/
 * setters, which shouldn't be bound in this way.
 * @param cls
 * @param thisVar
 * @param ignoreMethods
 */
export function bindThis(cls: any, thisVar: any, ignoreMethods: string[] = []) {
	try {
		const methods = Object.getOwnPropertyNames(cls.prototype);
		methods
			.filter((n) => {
				return !/(?:constructor|componentDidMount|render)/.test(n);
			})
			.forEach((m) => {
				if (!ignoreMethods.includes(m)) {
					thisVar[m] = thisVar[m].bind(thisVar);
				}
			});
	} catch (e) {
		console.error(e.message);
	}
}
