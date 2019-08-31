const UInt64 = require("../lib/uint64");

const MAX = Number.MAX_SAFE_INTEGER;
const MOD = 10e9 + 7;

it("MAX_NUMBER, MOD 확인", () => {
  expect(MAX).toBe(9007199254740991);
  expect(MOD).toBe(10000000007);
  expect(MAX % MOD).toBe(9248435958);
});

describe("mod", () => {
  it("7 % 2 === 1", () => {
    const mod = new UInt64(7).mod(2);

    expect(mod.lo).toBe(1);
  });

  it("MAX % MOD === 9248435958", () => {
    const mod = new UInt64(MAX).mod(MOD);

    expect(mod.lo).toBe(9248435958);
  });
});
