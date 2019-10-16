import getTrackFeatures from "./get-track-features";
import * as camelotWheel from "./camelot-wheel";

describe("getTrackFeatures", function() {
  const spotifyDatasource = {
    get: jest.fn(() => spotifyApiResult)
  };
  beforeAll(function() {
    jest.spyOn(camelotWheel, "getKeyName").mockImplementation(() => {
      return "Gm";
    });
    jest.spyOn(camelotWheel, "getHarmonicKeys").mockImplementation(() => {
      return mockHarmonicKeys;
    });
  });
  it("should resolve the data from spotify", function(done) {
    return getTrackFeatures("123123123", "authToken", spotifyDatasource).then(
      result => {
        expect(result).toStrictEqual(expectedResult);
        done();
      }
    );
  });
});

const mockHarmonicKeys = [
  {
    name: "Gm",
    pitchClass: 7,
    mode: 0
  },
  {
    name: "Cm",
    pitchClass: 0,
    mode: 0
  },
  {
    name: "Dm",
    pitchClass: 2,
    mode: 0
  },
  {
    name: "E",
    pitchClass: 4,
    mode: 1
  }
];

const expectedResult = {
  key: {
    mode: 0,
    name: "Gm",
    pitchClass: 7
  },
  tempo: 126.889,
  time_signature: 4,
  harmonicKeys: mockHarmonicKeys
};

const spotifyApiResult = {
  danceability: 0.882,
  energy: 0.767,
  key: 7,
  loudness: -10.314,
  mode: 0,
  speechiness: 0.122,
  acousticness: 0.00883,
  instrumentalness: 0.000982,
  liveness: 0.434,
  valence: 0.968,
  tempo: 126.889,
  type: "audio_features",
  id: "55TihUjVHdi3zChAUtKgHE",
  uri: "spotify:track:55TihUjVHdi3zChAUtKgHE",
  track_href: "https://api.spotify.com/v1/tracks/55TihUjVHdi3zChAUtKgHE",
  analysis_url:
    "https://api.spotify.com/v1/audio-analysis/55TihUjVHdi3zChAUtKgHE",
  duration_ms: 328859,
  time_signature: 4
};
