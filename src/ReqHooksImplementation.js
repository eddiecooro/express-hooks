export function useParam(req, description, [paramName, defaultValue]) {
	return req.params[paramName] || defaultValue;
}

export function useQuery(req, description, [queryName, defaultValue]) {
	return req.query[queryName] || defaultValue;
}

export function useHeader(req, description, [headerName, defaultValue]) {
	return req.get(headerName) || defaultValue;
}
