import expressMiddleware from '../ExpressMiddleware';
import request from 'supertest';
import {
	useRes,
	useReq,
	useParam,
	useHostName,
	usePath,
	useMethod,
	useQuery,
	useBaseUrl,
	useSetCookie,
} from '../Hooks';

describe('Hook runs correctly when integrates with express', () => {
	let express;
	let app;
	beforeEach(() => {
		express = require('express');
		app = express();
		app.use(expressMiddleware());
	});

	it('useRes', () => {
		app.get('/', (_, res) => {
			const middlewareRes = useRes();
			expect(middlewareRes).toBe(res);
			res.send(middlewareRes === res);
		});
		return expect(app).toNotExpressError(() => request(app));
	});

	it('useReq', () => {
		app.get('/', (req, res) => {
			const middlewareReq = useReq();
			expect(middlewareReq).toBe(req);
			res.end();
		});

		expect(app).toNotExpressError(() => request(app).get('/'));
	});

	it('useParam', () => {
		const name = 'Eddie';
		app.get('/:name', (_, res) => {
			const nameParam = useParam('name');
			expect(nameParam).toBe(name);
			res.send(nameParam);
		});
		return expect(app).toNotExpressError(() => request(app).get(`/${name}`));
	});

	it.each([['/eddie', '/eddie'], ['/', '/'], ['/:name', '/eddie'], ['/:name', '/']])(
		'Testing usePath for: %s',
		(path, reqPath) => {
			app.get(path, (_, res) => {
				expect(usePath()).toBe(reqPath);
				res.end();
			});
			return expect(app).toNotExpressError(() => request(app).get(reqPath));
		},
	);

	it.each([['GET'], ['POST'], ['PUT']])('Testing useMethod for: %s method', method => {
		app.get('/', (_, res) => {
			expect(useMethod()).toBe(method);
			res.end();
		});
		return expect(app).toNotExpressError(() => request(app)[method.toLowerCase()]('/'));
	});

	it('useQuery', () => {
		app.get('/', (_, res) => {
			expect(useQuery('name')).toBe('eddie');
			res.end();
		});
		return expect(app).toNotExpressError(() => request(app).get('/?name=eddie'));
	});

	it('useHostName', () => {
		app.get('/', (_, res) => {
			const hostName = useHostName();
			expect(hostName).toBe('127.0.0.1');
			res.end();
		});

		return expect(app).toNotExpressError(() => request(app).get('/'));
	});

	it('useBaseUrl', () => {
		const router = express.Router();
		router.get('/cooro', (_, res) => {
			const baseUrl = useBaseUrl();
			expect(baseUrl).toBe('/eddie');
			res.send(baseUrl);
		});
		app.use('/eddie', router);

		return expect(app).toNotExpressError(() => request(app).get('/eddie/cooro'));
	});

	it('useSetCookie', () => {
		app.get('/', (_, res) => {
			useSetCookie('name', 'eddie');
			res.end();
		});

		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.expect(200)
				.expect('set-cookie', 'name=eddie; Path=/'),
		);
	});
});
