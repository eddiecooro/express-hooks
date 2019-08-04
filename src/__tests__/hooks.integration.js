import expressMiddleware from '../index';
import request from 'supertest';
import { useRes, useReq, useParam } from '../Hooks';

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
});
