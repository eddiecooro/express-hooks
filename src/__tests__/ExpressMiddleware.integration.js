import expressMiddleware from '../ExpressMiddleware';
import request from 'supertest';
import { useRes } from '../BaseHooks';

describe('ExpressMiddleware integrates correctly with express package', () => {
	let app;
	beforeEach(() => {
		const express = require('express');
		app = express();
		app.use(expressMiddleware());
	});

	it('Works with normal routes', () => {
		app.get('/', () => {
			const res = useRes();
			res.end();
		});
		return expect(app).toNotExpressError(() => request(app).get('/'));
	});

	it('Works with async routes', () => {
		app.get('/', async () => {
			setTimeout(() => {
				const res = useRes();
				res.end();
			}, 0);
		});

		return expect(app).toNotExpressError(() => request(app).get('/'));
	});

	it('Works correctly even after ending the response', () => {
		app.get('/', (req, _res, next) => {
			const res = useRes();
			res.end();
			next();
		});
		app.get('/', () => {
			useRes();
		});

		return expect(app).toNotExpressError(() => request(app).get('/'));
	});
});
