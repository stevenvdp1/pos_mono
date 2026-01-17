import { poseidonApi } from './poseidon-api.js';

describe('poseidonApi', () => {
  it('should work', () => {
    expect(poseidonApi()).toEqual('poseidon-api');
  })
})
