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

export function useBaseUrl() {
	const req = useReq();
	return req.baseUrl;
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

export function useHostName() {
	const req = useReq();
	return req.hostname;
}

export function useSetCookie(cookieName, cookieValue, options) {
	const res = useRes();
	return res.cookie(cookieName, cookieValue, options);
}

export function useAppend(field, value) {
	const res = useRes();
	return res.append(field, value);
}

export function useAttachment(fileName) {
	const res = useRes();
	return res.attachment(fileName);
}

export function useHeader(headerName, defaultValue) {
	const req = useReq();
	return req.get(headerName) || defaultValue;
}

export function useResponseHeader(headerName, defaultValue) {
	const res = useRes();
	return res.get(headerName) || defaultValue;
}

export function useIsAcceptable(contentType) {
	const req = useReq();
	return req.accepts(contentType);
}

export function useIsCharsetAcceptable(charSet) {
	const req = useReq();
	return req.acceptsCharsets(charSet);
}
