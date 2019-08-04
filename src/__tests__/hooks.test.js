import { useParam } from '../Hooks';

describe('hooks', () => {
  it('hook throws error when used without dispatcher', () => {
    expect(() => useParam()).toThrowErrorMatchingSnapshot();
  });
});
