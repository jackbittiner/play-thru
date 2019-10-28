import playTrack from "./play-track";

describe("playTrack", function() {
  it("should return a success object on success", function(done) {
    const spotifyDatasource = {
      put: jest.fn()
    };

    const expectedResult = {
      status: "success",
      trackUri: "trackUri:asd123",
      deviceId: "deviceId:asdfg234"
    };
    return playTrack(
      "trackUri:asd123",
      "deviceId:asdfg234",
      spotifyDatasource
    ).then(result => {
      expect(result).toStrictEqual(expectedResult);
      done();
    });
  });

  it("should return a success object on success", function(done) {
    const spotifyDatasource = {
      put: jest.fn(() => {
        throw new Error("bad request");
      })
    };

    const expectedResult = {
      status: "error: Error: bad request",
      trackUri: "trackUri:asd123",
      deviceId: "deviceId:asdfg234"
    };
    return playTrack(
      "trackUri:asd123",
      "deviceId:asdfg234",
      spotifyDatasource
    ).then(result => {
      expect(result).toStrictEqual(expectedResult);
      done();
    });
  });
});
