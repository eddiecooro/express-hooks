import {
	useParam,
	useRes,
	useReq,
	usePath,
	useMethod,
	useQuery,
	useHostname,
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
} from '../Hooks';
import { setDispatcher } from '../CurrentDispatcher';

describe('hooks', () => {
	it('hook throws error when used without dispatcher', () => {
		expect(() => useReq()).toThrowErrorMatchingSnapshot();
	});

	describe('useRes', () => {
		it('Returns the response object correctly', () => {
			setDispatcher({
				_res: 'Res',
			});
			expect(useRes()).toMatch('Res');
		});
	});

	describe('useReq', () => {
		it('Returns the request object correctly', () => {
			setDispatcher({
				_req: 'Req',
			});
			expect(useReq()).toMatch('Req');
		});
	});

	describe('useParam', () => {
		beforeEach(() => {
			setDispatcher({
				_req: {
					params: {
						name: 'Eddie',
					},
				},
			});
		});

		it('Returns the correct param from the request', () => {
			expect(useParam('name')).toMatch('Eddie');
		});

		it("Returns the default value if the specified param doesn't exist", () => {
			expect(useParam('Hello', 'Cooro')).toMatch('Cooro');
		});
	});

	describe('useBaseUrl', () => {
		it('Returns the correct base url', () => {
			const baseUrl = '/Eddie';
			setDispatcher({
				_req: {
					baseUrl,
				},
			});
			expect(useBaseUrl()).toMatch(baseUrl);
		});
	});

	describe('usePath', () => {
		it('Returns the path from the request object', () => {
			const path = '/ed';
			setDispatcher({ _req: { path } });
			expect(usePath()).toBe('/ed');
		});
	});

	describe('useMethod', () => {
		it('Returns the method from the request object', () => {
			const method = 'GET';
			setDispatcher({ _req: { method } });
			expect(useMethod()).toBe(method);
		});
	});

	describe('useQuery', () => {
		beforeEach(() => {
			setDispatcher({ _req: { query: { name: 'eddie' } } });
		});
		it('Returns the query from the request object', () => {
			expect(useQuery('name')).toBe('eddie');
		});

		it("Returns default value if the query doesn't exist", () => {
			expect(useQuery('lastName', 'cooro')).toBe('cooro');
		});
	});

	describe('useHostname', () => {
		it('Returns the hostName from the req object', () => {
			const hostname = 'eddiehost';
			setDispatcher({
				_req: {
					hostname,
				},
			});
			expect(useHostname()).toBe(hostname);
		});
	});

	describe('useSetCookit', () => {
		it('Calls the res.cookie with the provided parameters', () => {
			const returnValue = 'COOKIE SETTED';
			const cookieName = 'name';
			const cookieValue = 'eddie';
			const options = 'options';
			const cookieFN = jest.fn(() => returnValue);
			setDispatcher({
				_res: {
					cookie: cookieFN,
				},
			});

			expect(useSetCookie(cookieName, cookieValue, options)).toBe(returnValue);
			expect(cookieFN).toHaveBeenCalledTimes(1);
			expect(cookieFN).toHaveBeenCalledWith(cookieName, cookieValue, options);
		});
	});

	describe('useAppend', () => {
		it('Calls res.append with the provided parameters', () => {
			const returnValue = 'HEADER APPENDED';
			const name = 'name';
			const value = 'eddie';

			const appendFN = jest.fn(() => returnValue);
			setDispatcher({
				_res: {
					append: appendFN,
				},
			});

			expect(useAppend(name, value)).toBe(returnValue);
			expect(appendFN).toHaveBeenCalledTimes(1);
			expect(appendFN).toHaveBeenCalledWith(name, value);
		});
	});

	describe('useAttachment', () => {
		it('Calls res.attachment with the provided parameters', () => {
			const returnValue = 'ATTACHED';
			const fileName = 'file name';

			const attachFN = jest.fn(() => returnValue);
			setDispatcher({ _res: { attachment: attachFN } });

			expect(useAttachment(fileName)).toBe(returnValue);
			expect(attachFN).toHaveBeenCalledTimes(1);
			expect(attachFN).toHaveBeenCalledWith(fileName);
		});
	});

	describe('useHeader', () => {
		it('Calls req.get with the provided header name', () => {
			const headerName = 'HEADER';
			const headerValue = 'VALUE';

			const getFN = jest.fn(() => headerValue);
			setDispatcher({ _req: { get: getFN } });

			expect(useHeader(headerName)).toBe(headerValue);
			expect(getFN).toHaveBeenCalledTimes(1);
			expect(getFN).toHaveBeenCalledWith(headerName);
		});

		it("Returns default value if the header doesn't exist", () => {
			const defaultValue = 'default';
			setDispatcher({ _req: { get: () => {} } });
			expect(useHeader('HEADER', defaultValue)).toBe(defaultValue);
		});
	});

	describe('useResponseHeader', () => {
		it('Calls res.get with the provided header name', () => {
			const headerName = 'HEADER';
			const headerValue = 'VALUE';

			const getFN = jest.fn(() => headerValue);
			setDispatcher({ _res: { get: getFN } });

			expect(useResponseHeader(headerName)).toBe(headerValue);
			expect(getFN).toHaveBeenCalledTimes(1);
			expect(getFN).toHaveBeenCalledWith(headerName);
		});

		it("Returns default value if the header doesn't exist", () => {
			const defaultValue = 'default';
			setDispatcher({ _res: { get: () => {} } });
			expect(useResponseHeader('HEADER', defaultValue)).toBe(defaultValue);
		});
	});

	describe('useIsAcceptable', () => {
		it('Calls req.accepts with the provided parameters', () => {
			const returnValue = true;
			const contentType = 'json';
			const acceptsFN = jest.fn(() => returnValue);
			setDispatcher({
				_req: {
					accepts: acceptsFN,
				},
			});

			expect(useIsAcceptable(contentType)).toBe(returnValue);
			expect(acceptsFN).toHaveBeenCalledTimes(1);
			expect(acceptsFN).toHaveBeenCalledWith(contentType);
		});
	});

	describe('useIsCharsetAcceptable', () => {
		it('Calls req.acceptsCharset with the provided parameters', () => {
			const returnValue = true;
			const charset = 'json';
			const acceptsFN = jest.fn(() => returnValue);
			setDispatcher({
				_req: {
					acceptsCharset: acceptsFN,
				},
			});

			expect(useIsCharsetAcceptable(charset)).toBe(returnValue);
			expect(acceptsFN).toHaveBeenCalledTimes(1);
			expect(acceptsFN).toHaveBeenCalledWith(charset);
		});
	});

	describe('useIsEncodingAcceptable', () => {
		it('Calls req.acceptsEncoding with the provided parameters', () => {
			const returnValue = true;
			const encoding = 'a';
			const acceptsFN = jest.fn(() => returnValue);
			setDispatcher({
				_req: {
					acceptsEncoding: acceptsFN,
				},
			});

			expect(useIsEncodingAcceptable(encoding)).toBe(returnValue);
			expect(acceptsFN).toHaveBeenCalledTimes(1);
			expect(acceptsFN).toHaveBeenCalledWith(encoding);
		});
	});

	describe('useIsLanguageAcceptable', () => {
		it('Calls req.acceptsLanguage with the provided parameters', () => {
			const returnValue = true;
			const language = 'fa';
			const acceptsFN = jest.fn(() => returnValue);
			setDispatcher({ _req: { acceptsLanguage: acceptsFN } });

			expect(useIsLanguageAcceptable(language)).toBe(returnValue);
			expect(acceptsFN).toHaveBeenCalledTimes(1);
			expect(acceptsFN).toHaveBeenCalledWith(language);
		});
	});

	describe('useRange', () => {
		it('Calls req.range with the provided parameters', () => {
			const returnValue = 'RETURN';
			const size = 1000;
			const rangeFN = jest.fn(() => returnValue);
			setDispatcher({ _req: { range: rangeFN } });
			expect(useRange(size)).toBe(returnValue);
			expect(rangeFN).toHaveBeenCalledTimes(1);
			expect(rangeFN).toHaveBeenCalledWith(size);
		});
	});

	describe('useProtocol', () => {
		it('Returns the protocol field', () => {
			const protocol = 'https';
			setDispatcher({ _req: { protocol } });
			expect(useProtocol()).toBe(protocol);
		});
	});
});
