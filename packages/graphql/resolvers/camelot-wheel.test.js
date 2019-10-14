import { getKeyName, getHarmonicKeys } from "./camelot-wheel";

describe("getKeyName", function() {
  const keys = [
    { name: "C", pitchClass: 0, mode: 1 },
    { name: "Db", pitchClass: 1, mode: 1 },
    { name: "D", pitchClass: 2, mode: 1 }
  ];
  it("should return the key name from the numeric pitchclass and mode", function() {
    expect(getKeyName(0, 1, keys)).toEqual("C");
    expect(getKeyName(1, 1, keys)).toEqual("Db");
    expect(getKeyName(2, 1, keys)).toEqual("D");
  });
});

describe("getHarmonicKeys", function() {
  it("should return the harmonic keys for th given key", function() {
    expect(getHarmonicKeys(0, 1)).toEqual([
      { name: "C", pitchClass: 0, mode: 1 },
      { name: "F", pitchClass: 5, mode: 1 },
      { name: "G", pitchClass: 7, mode: 1 },
      { name: "Am", pitchClass: 9, mode: 0 }
    ]);
  });
});
