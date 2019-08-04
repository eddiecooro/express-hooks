import { useParam, useRes, useReq } from '../Hooks';
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
			CurrentDispatcher.current = {
				_req: {
					params: {
						name: 'Eddie',
					},
				},
			};
		});

		it('Returns the correct param from the request', () => {
			expect(useParam('name')).toMatch('Eddie');
		});

		it("Returns the default value if the specified param doesn't exist", () => {
			expect(useParam('Hello', 'Cooro')).toMatch('Cooro');
		});
	});
});
