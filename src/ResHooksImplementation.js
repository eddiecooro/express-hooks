export function useResponseHeader(res, description, [headerName, defaultValue]) {
	return res.get(headerName) || defaultValue;
}

export function useSetLocals(res, description, [locals, merge = true]) {
	if (merge) {
		res.locals = { ...res.locals, ...locals };
	} else {
		res.locals = locals;
	}
}
