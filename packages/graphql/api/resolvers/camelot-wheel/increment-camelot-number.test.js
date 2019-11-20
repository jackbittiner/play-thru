import { incrementCamelotNumber } from "./increment-camelot-number";

describe("incrementCamelotNumber", function() {
  it("should return next number in the sequence", function() {
    expect(incrementCamelotNumber(0)).toEqual(1);
  });
  it("should wrap back to 1 after 12", function() {
    expect(incrementCamelotNumber(12)).toEqual(1);
  });
});
