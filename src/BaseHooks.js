import { resolveDispatcher } from './CurrentDispatcher';

export function useRes() {
	const dispatcher = resolveDispatcher();
	return dispatcher._res;
}

export function useReq() {
	const dispatcher = resolveDispatcher();
	return dispatcher._req;
}
