declare namespace jest {
	interface Matchers<R> {
		toNotExpressError(app: any, request: any): R;
	}
}
