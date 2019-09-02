const UInt64 = require('../lib/uint64');

const random = new UInt64('10293');
const two31minus1 = new UInt64('2147483647');
const two31 = new UInt64('2147483648');
const two32minus1 = new UInt64('4294967295');
const two32 = new UInt64('4294967296');
const two63minus1 = new UInt64('9223372036854775807');

describe('minus test', () => {
  it('result 0', () => {
    expect(random.minus(random).toString()).toBe('0');
    expect(two31minus1.minus(two31minus1).toString()).toBe('0');
    expect(two31.minus(two31).toString()).toBe('0');
    expect(two32minus1.minus(two32minus1).toString()).toBe('0');
    expect(two32.minus(two32).toString()).toBe('0');
    expect(two63minus1.minus(two63minus1).toString()).toBe('0');
  });

  it('minus 0', () => {
    expect(random.minus(0).toString()).toBe(random.toString());
    expect(two31minus1.minus(0).toString()).toBe(two31minus1.toString());
    expect(two31.minus(0).toString()).toBe(two31.toString());
    expect(two32minus1.minus(0).toString()).toBe(two32minus1.toString());
    expect(two32.minus(0).toString()).toBe(two32.toString());
    expect(two63minus1.minus(0).toString()).toBe(two63minus1.toString());
  });

  it('32bit - 32bit test', () => {
    expect(two32minus1.minus(random).toString()).toBe('4294957002');
    expect(two32.minus(two32minus1).toString()).toBe('1');
  });

  it('64bit - 32bit test', () => {
    expect(two63minus1.minus(two32).toString()).toBe('9223372032559808511');
    expect(two63minus1.minus(two32minus1).toString()).toBe('9223372032559808512');
    expect(two63minus1.minus(two31).toString()).toBe('9223372034707292159');
    expect(two63minus1.minus(random).toString()).toBe('9223372036854765514');
  });

  it('64bit - 64bit test', () => {
    const two48 = new UInt64(Math.pow(2, 48));
    const two54 = new UInt64(Math.pow(2, 54));

    expect(two63minus1.minus(two54).toString()).toBe('9205357638345293823');
    expect(two54.minus(two48).toString()).toBe('17732923532771328');
  });
});
