expect.extend({
	async toNotExpressError(app, request) {
		let error;
		// eslint-disable-next-line no-unused-vars
		app.use(function(err, req, res, next) {
			error = err;
			next();
		});
		await request();
		if (error) {
			throw error;
		} else {
			return {
				pass: true,
			};
		}
	},
});
