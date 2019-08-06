let CurrentDispatcher = {
	current: null,
};

export function setDispatcher(dispatcher) {
	CurrentDispatcher.current = dispatcher;
}

export function resolveDispatcher() {
	if (CurrentDispatcher.current) {
		return CurrentDispatcher.current;
	} else {
		throw new Error('Express hooks should be used inside of express handlers or middlewares');
	}
}
