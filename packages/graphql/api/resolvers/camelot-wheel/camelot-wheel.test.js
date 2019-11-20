import { getKeyName, getHarmonicKeys, getCamelotRoute } from "./camelot-wheel";

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
  it("should return the harmonic keys for the given key", function() {
    expect(getHarmonicKeys(0, 1)).toEqual([
      { name: "C", pitchClass: 0, mode: 1, camelotPosition: 8 },
      { name: "F", pitchClass: 5, mode: 1, camelotPosition: 7 },
      { name: "G", pitchClass: 7, mode: 1, camelotPosition: 9 },
      { name: "Am", pitchClass: 9, mode: 0, camelotPosition: 8 }
    ]);
  });
});

describe("getCamelotRoute", function() {
  it("should return the route from start key to end key", function() {
    const startKey = {
      pitchClass: 0,
      mode: 1
    };
    const targetKey = {
      pitchClass: 9,
      mode: 1
    };

    expect(getCamelotRoute(startKey, targetKey)).toEqual([
      { name: "G", pitchClass: 7, mode: 1, camelotPosition: 9 },
      { name: "D", pitchClass: 2, mode: 1, camelotPosition: 10 }
    ]);
  });

  it("should wrap round the camelot wheel clockwise", function() {
    const startKey = {
      pitchClass: 4,
      mode: 1
    };
    const targetKey = {
      pitchClass: 6,
      mode: 1
    };

    expect(getCamelotRoute(startKey, targetKey)).toEqual([
      { name: "B", pitchClass: 11, mode: 1, camelotPosition: 1 }
    ]);
  });

  it("should return empty array if the same key", function() {
    const startKey = {
      pitchClass: 3,
      mode: 1
    };
    const targetKey = {
      pitchClass: 3,
      mode: 1
    };

    expect(getCamelotRoute(startKey, targetKey)).toEqual([]);
  });
  it("should return empty array if target key is immediately after startKey", function() {
    const startKey = {
      pitchClass: 3,
      mode: 1
    };
    const targetKey = {
      pitchClass: 10,
      mode: 1
    };

    expect(getCamelotRoute(startKey, targetKey)).toEqual([]);
  });
});
