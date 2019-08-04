import { resolveDispatcher } from './utils';

// eslint-disable-next-line no-unused-vars
export function useParam(paramName) {
	// eslint-disable-next-line no-unused-vars
	const dispatcher = resolveDispatcher();
}

export function useRes() {
	const dispatcher = resolveDispatcher();
	return dispatcher._res;
}

export function useReq() {
	const dispatcher = resolveDispatcher();
	return dispatcher._req;
}
