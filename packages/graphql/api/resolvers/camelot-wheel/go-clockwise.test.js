import { goClockwise } from "./go-clockwise";

describe("incrementCamelotNumber", function() {
  it("should return true if start position is 2 less than end position", function() {
    expect(goClockwise(2, 4)).toEqual(true);
  });
  it("should return false if start position is 2 more than end position", function() {
    expect(goClockwise(4, 2)).toEqual(false);
  });

  it("should go clockwise wrapping round 12", function() {
    expect(goClockwise(12, 1)).toEqual(true);
  });

  it("should return false if start position is 2 more than end position", function() {
    expect(goClockwise(1, 12)).toEqual(false);
  });

  it("should return true when equidistant", function() {
    expect(goClockwise(12, 6)).toEqual(true);
  });
});
