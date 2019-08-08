export function useResponseHeader(res, description, [headerName, defaultValue]) {
	return res.get(headerName) || defaultValue;
}
