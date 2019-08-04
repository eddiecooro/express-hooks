import expressMiddleware from '../index';
import request from 'supertest';
import { useRes, useReq } from '../Hooks';

describe('Runs correctly when integrates with express', () => {
	let app;
	let testRequestHandler;
	beforeEach(() => {
		const express = require('express');
		app = express();
		app.use(expressMiddleware);

		testRequestHandler = function(requestHandler) {
			app.get('/', (req, res, next) => {
				requestHandler(req, res, next);
			});
			return request(app).get('/');
		};
	});
});
