import expressMiddleware from '../index';
import request from 'supertest';
import { useRes, useReq, useParam, usePath } from '../Hooks';

describe('Hook runs correctly when integrates with express', () => {
	let app;
	beforeEach(() => {
		const express = require('express');
		app = express();
		app.use(expressMiddleware);
	});

	it('useRes', () => {
		app.get('/', (_, res) => {
			const middlewareRes = useRes();
			expect(middlewareRes).toBe(res);
			res.end();
		});
		return request(app).get('/');
	});

	it('useReq', () => {
		app.get('/', (req, res) => {
			const middlewareReq = useReq();
			expect(middlewareReq).toBe(req);
			res.end();
		});
		return request(app).get('/');
	});

	it('useParam', () => {
		const name = 'Eddie';
		app.get('/:name', (_, res) => {
			const nameParam = useParam('name');
			expect(nameParam).toMatch(name);
			res.end();
		});
		return request(app).get(`/${name}`);
	});

	it.each([['/eddie', '/eddie'], ['/', '/'], ['/:name', '/eddie'], ['/:name', '/']])(
		'Testing usePath for: %s',
		(path, reqPath) => {
			app.get(path, (_, res) => {
				expect(usePath()).toBe(reqPath);
				res.end();
			});
			return request(app).get(reqPath);
		},
	);
});
