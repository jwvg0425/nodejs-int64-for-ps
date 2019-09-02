const TWO_32 = 4294967296;
const TWO_16 = 65536;

class UInt64 {
  constructor() {
    if (arguments.length === 0) {
      this.lo = 0;
      this.hi = 0;
    } else if (arguments.length === 1) {
      if (typeof arguments[0] === "number") {
        this.lo = arguments[0] % TWO_32;
        this.hi = Math.floor(arguments[0] / TWO_32);
      } else {
        this.lo = arguments[0].lo;
        this.hi = arguments[0].hi;
      }
    } else if (arguments.length === 2) {
      this.lo = arguments[0];
      this.hi = arguments[1];
    }
  }

  plus(x) {
    x = new UInt64(x);
    const result = new UInt64();
    result.lo = this.lo + x.lo;
    result.hi = this.hi + x.hi;
    result.calcCarry();

    return result;
  }

  minus(x) {
    x = new UInt64(x);
    const result = new UInt64();
    result.lo = this.lo - x.lo;
    result.hi = this.hi - x.hi;

    if (result.lo < 0) {
      result.lo += TWO_32;
      result.hi -= 1;
    }

    return result;
  }

  times(x) {
    x = new UInt64(x);
    const result = new UInt64();
    const [a1, a2, a3, a4] = this.split16();
    const [b1, b2, b3, b4] = x.split16();
    result.lo = a4 * b4 + TWO_16 * (a3 * b4 + a4 * b3);
    result.hi = a2 * b2 + TWO_16 * (a1 * b2 + a2 * b1) + a3 * b3;

    result.calcCarry();

    return result;
  }

  div(x) {
    return this.divmod(x).div;
  }

  mod(x) {
    return this.divmod(x).mod;
  }

  divmod(x) {
    x = new UInt64(x);

    if (this.lt(x)) {
      return { div: new UInt64(0), mod: new UInt64(this) };
    }

    const div = new UInt64();
    let mod = new UInt64();

    for (let b = 63; b >= 0; b--) {
      mod = mod.times(2);
      if (this.getBit(b) !== 0) {
        mod.setBit(0);
      }
      if (mod.gte(x)) {
        mod = mod.minus(x);
        div.setBit(b);
      }
    }

    return { div, mod };
  }

  gt(x) {
    x = new UInt64(x);
    if (this.hi === x.hi) {
      return this.lo > x.lo;
    }

    return this.hi > x.hi;
  }

  gte(x) {
    return !this.lt(x);
  }

  lt(x) {
    x = new UInt64(x);
    if (this.hi === x.hi) {
      return this.lo < x.lo;
    }

    return this.hi < x.hi;
  }

  lte(x) {
    return !this.gt(x);
  }

  eq(x) {
    x = new UInt64(x);

    return this.lo === x.lo && this.hi === x.hi;
  }

  notEq(x) {
    return !this.eq(x);
  }

  toNumber() {
    return this.lo + this.hi * TWO_32;
  }

  calcCarry() {
    if (this.lo >= TWO_32) {
      this.hi += Math.floor(this.lo / TWO_32);
      this.lo %= TWO_32;
    }

    if (this.hi >= TWO_32) {
      this.hi %= TWO_32;
    }
  }

  split16() {
    return [
      Math.floor(this.hi / TWO_16),
      this.hi % TWO_16,
      Math.floor(this.lo / TWO_16),
      this.lo % TWO_16
    ];
  }

  getBit(idx) {
    if (idx < 32) {
      const v = this.pow2(idx);
      if (idx == 31) {
        return this.lo >= v ? 1 : 0;
      }
      return (this.lo & v) >> idx;
    }
    idx -= 32;

    const vh = this.pow2(idx);
    if (idx == 31) {
      return this.hi >= vh ? 1 : 0;
    }
    return (this.hi & vh) >> idx;
  }

  setBit(idx) {
    if (this.getBit(idx) === 1) {
      return;
    }

    if (idx < 32) {
      this.lo += this.pow2(idx);
      return;
    }

    this.hi += this.pow2(idx - 32);
  }

  toString() {
    let v = new UInt64(this);
    const digits = [];

    while (v.gt(0)) {
      digits.push(v.mod(10).toNumber());
      v = v.div(10);
    }

    return digits
      .reverse()
      .map(d => d.toString())
      .join("");
  }

  pow2(x) {
    if (x == 31) {
      return TWO_32 / 2;
    }

    return 1 << x;
  }
}

module.exports = UInt64;
