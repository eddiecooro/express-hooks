import { resolveDispatcher } from './utils';

export function useParam(paramName) {
  const dispatcher = resolveDispatcher();
}

export function useRes() {
  const dispatcher = resolveDispatcher();
  return dispatcher._res;
}

