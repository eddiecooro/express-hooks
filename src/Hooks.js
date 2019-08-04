import { resolveDispatcher } from './CurrentDispatcher';

export function useParam(paramName, defaultValue) {
	const req = useReq();
	return (req.params && req.params[paramName]) || defaultValue;
}

export function useRes() {
	const dispatcher = resolveDispatcher();
	return dispatcher._res;
}

export function useReq() {
	const dispatcher = resolveDispatcher();
	return dispatcher._req;
}
