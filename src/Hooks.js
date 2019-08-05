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

export function usePath() {
	const req = useReq();
	return req.path;
}

export function useMethod() {
	const req = useReq();
	return req.method;
}

export function useQuery(queryName, defaultValue) {
	if (!queryName) throw new Error('queryName parameter is required');
	const req = useReq();
	return req.query[queryName] || defaultValue;
}
