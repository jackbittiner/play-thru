import playTrack from "./play-track";

describe("playTrack", function() {
  it("should return a success object on success", function(done) {
    const spotifyDatasource = {
      put: jest.fn()
    };

    const expectedResult = {
      status: "success",
      track: trackToPlay,
      deviceId: "deviceId:asdfg234",
      setlist: expectedSetlist
    };
    return playTrack(
      trackToPlay,
      "deviceId:asdfg234",
      setlistSoFar,
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
      track: trackToPlay,
      deviceId: "deviceId:asdfg234",
      setlist: setlistSoFar
    };
    return playTrack(
      trackToPlay,
      "deviceId:asdfg234",
      setlistSoFar,
      spotifyDatasource
    ).then(result => {
      expect(result).toStrictEqual(expectedResult);
      done();
    });
  });
});

const trackToPlay = {
  artist: "new artist",
  id: "123456",
  name: "this is a good song",
  uri: "spotify:track:11dFghVXANMlKmJXsNCbNl",
  art: "String!"
};

const setlistSoFar = [
  {
    artist: "old artist",
    id: "asdfg",
    name: "oh what a track",
    uri: "spotify:track:11dFghVXANMlKmJXsNCbNl",
    art: "String!"
  }
];

const expectedSetlist = [
  {
    artist: "old artist",
    id: "asdfg",
    name: "oh what a track",
    uri: "spotify:track:11dFghVXANMlKmJXsNCbNl",
    art: "String!"
  },
  {
    artist: "new artist",
    id: "123456",
    name: "this is a good song",
    uri: "spotify:track:11dFghVXANMlKmJXsNCbNl",
    art: "String!"
  }
];
