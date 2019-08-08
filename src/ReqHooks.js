import config from './ReqHooksConfig';
import { useReq } from './Hooks';
import { generateHookImpelemntation } from './utils';

module.exports = {};
Object.entries(config).forEach(([requestObjName, hookDescription]) => {
	if (typeof hookDescription === 'string') {
		hookDescription = {
			type: 'field',
			name: hookDescription,
		};
	}

	let hookImplementation = generateHookImpelemntation(useReq, requestObjName, hookDescription);

	if (!hookImplementation) {
		throw new Error('Unsupported hook type, This is a bug in ExpressHooks package itself');
	}

	module.exports[hookDescription.name] = hookImplementation;
});
