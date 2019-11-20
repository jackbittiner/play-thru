import {
  incrementCamelotNumber,
  reduceCamelotNumber
} from "./change-camelot-number";

describe("incrementCamelotNumber", function() {
  it("should return next number in the sequence", function() {
    expect(incrementCamelotNumber(1)).toEqual(2);
  });
  it("should wrap back to 1 after 12", function() {
    expect(incrementCamelotNumber(12)).toEqual(1);
  });
});

describe("reduceCamelotNumber", function() {
  it("should return previous number in the sequence", function() {
    expect(reduceCamelotNumber(12)).toEqual(11);
  });
  it("should wrap back to 12 before 1", function() {
    expect(reduceCamelotNumber(1)).toEqual(12);
  });
});
