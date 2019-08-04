import { useParam, useRes, useReq } from '../Hooks';
import CurrentDispatcher from '../CurrentDispatcher';

describe('hooks', () => {
  it('hook throws error when used without dispatcher', () => {
    expect(() => useParam()).toThrowErrorMatchingSnapshot();
  });

  describe('useRes', () => {
    it('Returns the response object correctly', () => {
      CurrentDispatcher.current = {
        _res: 'Res'
      };
      expect(useRes()).toMatch('Res');
    });
  });

  describe('useReq', () => {
    it('Returns the request object correctly', () => {
      CurrentDispatcher.current = {
        _req: 'Req'
      };
      expect(useReq()).toMatch('Req');
    });
  });
});
