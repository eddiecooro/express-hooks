export function generateHookImpelemntation(getObj, objFieldName, hookDescription) {
	if (hookDescription.type === 'function') {
		return (...args) => {
			const obj = getObj();
			return obj[objFieldName](...args);
		};
	} else if (hookDescription.type === 'field') {
		return () => {
			const obj = getObj();
			return obj[objFieldName];
		};
	} else if (hookDescription.type === 'object') {
		return (...args) => {
			const obj = getObj();
			return obj[objFieldName][args[0]];
		};
	} else if (typeof hookDescription.implementation === 'function') {
		return (...args) => {
			const obj = getObj();
			return hookDescription.implementation(obj, hookDescription, args);
		};
	}
}
