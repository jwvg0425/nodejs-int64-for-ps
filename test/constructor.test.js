const UInt64 = require('../lib/uint64');

describe('constructor test', () => {
  it('fromString', () => {
    const zero = new UInt64('0');
    const two31minus1 = new UInt64('2147483647');
    const two31 = new UInt64('2147483648');
    const two32minus1 = new UInt64('4294967295');
    const two32 = new UInt64('4294967296');
    const two63minus1 = new UInt64('9223372036854775807');

    expect(zero.toString()).toBe('0');
    expect(two31minus1.toString()).toBe('2147483647');
    expect(two31.toString()).toBe('2147483648');
    expect(two32minus1.toString()).toBe('4294967295');
    expect(two32.toString()).toBe('4294967296');
    expect(two63minus1.toString()).toBe('9223372036854775807');
  });
});
