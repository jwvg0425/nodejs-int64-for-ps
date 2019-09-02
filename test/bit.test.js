const UInt64 = require('../lib/uint64');

describe('bit test', () => {
  it('get bit, set bit', () => {
    const bits = [...Array.from({ length: 64 }).keys()];
    const pows = bits.map((b) => {
      const value = new UInt64();
      value.setBit(b);
      return value;
    });

    expect(pows.every((p, idx) => p.getBit(idx) === 1));
    expect(pows.every((p, idx) => p.toString() === Math.pow(2, idx).toString()));
  });
});
