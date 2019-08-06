import { useRes } from './BaseHooks';

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

export function useResponseHeader(headerName, defaultValue) {
	const res = useRes();
	return res.get(headerName) || defaultValue;
}

export * from './BaseHooks';
export * from './ReqHooks';
