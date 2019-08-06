import expressMiddleware from '../ExpressMiddleware';
import { resolveDispatcher } from '../CurrentDispatcher';

describe('ExpressMiddleware', () => {
	it('expressMiddleware successfuly sets the dispatcher', () => {
		expressMiddleware('Req', 'Res', () => {
			const dispatcher = resolveDispatcher();
			expect(dispatcher).toEqual({ _req: 'Req', _res: 'Res' });
		});
	});

	it('removes dispatcher after calling next', () => {
		expressMiddleware('Req', 'Res', () => {});
		expect(() => resolveDispatcher()).toThrowErrorMatchingSnapshot();
	});
});
