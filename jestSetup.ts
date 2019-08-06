expect.extend({
	async toNotExpressError(app, request) {
		let error;
		// eslint-disable-next-line no-unused-vars
		app.use(function(err, req, res, next) {
			const isMatcherError =
				err.matcherResult && err.matcherResult.message !== undefined && err.matcherResult.pass !== undefined;
			if (isMatcherError) {
				error = err.matcherResult;
			}
			res.end();
		});
		await request();
		if (error) {
			return error;
		} else {
			return {
				pass: true,
			};
		}
	},
});
