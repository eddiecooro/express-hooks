import expressMiddleware from '../ExpressMiddleware';
import request from 'supertest';
import {
	useRes,
	useReq,
	useParam,
	useHostname,
	usePath,
	useMethod,
	useQuery,
	useBaseUrl,
	useSetCookie,
	useAppend,
	useAttachment,
	useHeader,
	useResponseHeader,
	useIsAcceptable,
	useIsCharsetAcceptable,
	useIsEncodingAcceptable,
	useIsLanguageAcceptable,
	useRange,
	useProtocol,
	useIsSecure,
	useIP,
	useIPs,
	useSubdomains,
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

	it('useHostname', () => {
		app.get('/', (_, res) => {
			const hostName = useHostname();
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

	it('useAppend', () => {
		const headerName = 'X-NAME';
		const headerValue = 'EDDIE';
		app.get('/', (_, res) => {
			useAppend(headerName, headerValue);
			res.end();
		});

		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.expect(200)
				.expect(headerName, headerValue),
		);
	});

	it('useAttachment', () => {
		const fileName = 'filename';
		app.get('/', (_, res) => {
			useAttachment(fileName);
			res.end();
		});

		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.expect(200)
				.expect('Content-Disposition', `attachment; filename="${fileName}"`),
		);
	});

	it('useHeader', () => {
		const headerName = 'Content-Type';
		const headerValue = 'application/json';
		app.get('/', (_, res) => {
			expect(useHeader(headerName)).toBe(headerValue);
			res.end();
		});

		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.set(headerName, headerValue),
		);
	});

	it('useResponseHeader', () => {
		const headerName = 'Content-Type';
		const headerValue = 'application/json';
		app.get('/', (_, res) => {
			res.set(headerName, headerValue);
			expect(useResponseHeader(headerName)).toContain(headerValue);
			res.end();
		});

		return expect(app).toNotExpressError(() => request(app).get('/'));
	});

	it('useIsAcceptable', () => {
		const contentType = 'application/json';
		app.get('/', (_, res) => {
			expect(useIsAcceptable('json')).toBeTruthy();
			res.end();
		});

		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.set('Accept', contentType),
		);
	});

	it('useIsCharsetAcceptable', () => {
		const charSet = 'utf8';
		app.get('/', (_, res) => {
			expect(useIsCharsetAcceptable(charSet)).toBeTruthy();
			res.end();
		});

		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.set('Accept-Charset', charSet),
		);
	});

	it('useIsEncodingAcceptable', () => {
		const encoding = 'a';
		app.get('/', (_, res) => {
			expect(useIsEncodingAcceptable(encoding)).toBeTruthy();
			res.end();
		});

		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.set('Accept-Encoding', encoding),
		);
	});

	it('useIsLanguageAcceptable', () => {
		const language = 'fa';
		app.get('/', (_, res) => {
			expect(useIsLanguageAcceptable(language)).toBeTruthy();
			res.end();
		});

		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.set('Accept-Language', language),
		);
	});

	it('useRange', () => {
		app.get('/', (_, res) => {
			const range = useRange(1000);
			expect(range).toHaveProperty('0.start');
			expect(range).toHaveProperty('0.end');
			expect(range).toHaveProperty('type');
			res.end();
		});

		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.set('Range', 'bytes=200-1000, 2000-6576,'),
		);
	});

	it('useProtocol', () => {
		app.get('/', (_, res) => {
			expect(useProtocol()).toBe('http');
			res.end();
		});
		return expect(app).toNotExpressError(() => request(app).get('/'));
	});

	it('useIsSecure', () => {
		app.get('/', (_, res) => {
			expect(useIsSecure()).toBe(false);
			res.end();
		});
		return expect(app).toNotExpressError(() => request(app).get('/'));
	});

	it('useIP', () => {
		app.enable('trust proxy');
		const ip = '4.2.2.4';
		app.get('/', (_, res) => {
			expect(useIP()).toBe(ip);
			res.end();
		});
		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.set('X-Forwarded-For', ip),
		);
	});

	it('useIPs', () => {
		const ips = ['1.1.1.1', '2.2.2.2', '3.3.3.3'];
		app.enable('trust proxy');
		app.get('/', (_, res) => {
			expect(useIPs()).toEqual(expect.arrayContaining(ips));
			res.end();
		});
		return expect(app).toNotExpressError(() =>
			request(app)
				.get('/')
				.set('X-Forwarded-For', ips.join(', ')),
		);
	});

	it('useSubdomains', () => {
		app.get('/', (_, res) => {
			expect(useSubdomains()).toStrictEqual([]);
			res.end();
		});
		return expect(app).toNotExpressError(() => request(app).get('/'));
	});
});
