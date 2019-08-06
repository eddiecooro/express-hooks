import { useParam, useRes, useReq, usePath, useMethod, useQuery, useHostName } from '../Hooks';
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

		it("Throws if the queryName param doesn't gets passed", () => {
			expect(() => useQuery()).toThrowErrorMatchingSnapshot();
    });
  });
  
	describe('useHostName', () => {
		it('Returns the hostName from the req object', () => {
			const hostname = 'eddiehost';
			setDispatcher({
				_req: {
					hostname,
				},
			});
			expect(useHostName()).toMatch(hostname);
		});
	});
});
