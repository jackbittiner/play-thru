import { changeCamelotNumber } from "./change-camelot-number";

describe("changeCamelotNumber", function() {
  it("should return next number in the sequence", function() {
    expect(changeCamelotNumber(1, true)).toEqual(2);
  });
  it("should wrap back to 1 after 12", function() {
    expect(changeCamelotNumber(12, true)).toEqual(1);
  });
  it("should return previous number in the sequence", function() {
    expect(changeCamelotNumber(12, false)).toEqual(11);
  });
  it("should wrap back to 12 before 1", function() {
    expect(changeCamelotNumber(1, false)).toEqual(12);
  });
});
