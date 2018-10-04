//Major Keys

const C = { name: "C", pitchClass: 0, mode: 1 };
const Db = { name: "Db", pitchClass: 1, mode: 1 };
const D = { name: "D", pitchClass: 2, mode: 1 };
const Eb = { name: "Eb", pitchClass: 3, mode: 1 };
const E = { name: "E", pitchClass: 4, mode: 1 };
const F = { name: "F", pitchClass: 5, mode: 1 };
const Gb = { name: "Gb", pitchClass: 6, mode: 1 };
const G = { name: "G", pitchClass: 7, mode: 1 };
const Ab = { name: "Ab", pitchClass: 8, mode: 1 };
const A = { name: "A", pitchClass: 9, mode: 1 };
const Bb = { name: "Bb", pitchClass: 10, mode: 1 };
const B = { name: "B", pitchClass: 11, mode: 1 };

//Minor pitchClasss

const Cm = { name: "Cm", pitchClass: 0, mode: 0 };
const Dbm = { name: "Dbm", pitchClass: 1, mode: 0 };
const Dm = { name: "Dm", pitchClass: 2, mode: 0 };
const Ebm = { name: "Ebm", pitchClass: 3, mode: 0 };
const Em = { name: "Em", pitchClass: 4, mode: 0 };
const Fm = { name: "Fm", pitchClass: 5, mode: 0 };
const Gbm = { name: "Gbm", pitchClass: 6, mode: 0 };
const Gm = { name: "Gm", pitchClass: 7, mode: 0 };
const Abm = { name: "Abm", pitchClass: 8, mode: 0 };
const Am = { name: "Am", pitchClass: 9, mode: 0 };
const Bbm = { name: "Bbm", pitchClass: 10, mode: 0 };
const Bm = { name: "Bm", pitchClass: 11, mode: 0 };

export const allKeys = [
  C,
  Db,
  D,
  Eb,
  E,
  F,
  Gb,
  G,
  Ab,
  A,
  Bb,
  B,
  Cm,
  Dbm,
  Dm,
  Ebm,
  Em,
  Fm,
  Gbm,
  Gm,
  Abm,
  Am,
  Bbm,
  Bm
];

export const CamelotWheel = {
  Ab: [Ab, Db, Eb, Fm],
  A: [A, D, E, Gbm],
  Bb: [Bb, Eb, F, Gm],
  B: [B, E, Gb, Abm],
  C: [C, F, G, Am],
  Db: [Db, Gb, Ab, Bbm],
  D: [D, G, A, Bm],
  Eb: [Eb, Ab, Bb, Cm],
  E: [E, A, B, Dbm],
  F: [F, Bb, C, Dm],
  Gb: [Gb, B, Db, Ebm],
  G: [G, C, D, Em],

  Abm: [Abm, Dbm, Ebm, F],
  Am: [Am, Dm, Em, Gb],
  Bbm: [Bbm, Ebm, Fm, G],
  Bm: [Bm, Em, Gbm, Ab],
  Cm: [Cm, Fm, Gm, A],
  Dbm: [Dbm, Gbm, Abm, Bb],
  Dm: [Dm, Gm, Am, B],
  Ebm: [Ebm, Abm, Bbm, C],
  Em: [Em, Am, Bm, Db],
  Fm: [Fm, Bbm, Cm, D],
  Gbm: [Gbm, Bm, Dbm, Eb],
  Gm: [Gm, Cm, Dm, E]
};

export const getKeyName = (pitchClass, mode, keys = allKeys) => {
  if (pitchClass === null || mode === null) return "Error";
  const keyName = keys.find(key => {
    return key.pitchClass === pitchClass && key.mode === mode;
  });
  return keyName.name;
};

export const getHarmonicKeys = (pitchClass, mode) => {
  const keyName = getKeyName(pitchClass, mode);
  return CamelotWheel[keyName];
};
