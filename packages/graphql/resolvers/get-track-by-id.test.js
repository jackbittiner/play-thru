import getTrackById from "./get-track-by-id";

describe("getTrackById", function() {
  const spotifyDatasource = {
    get: jest.fn(() => spotifyApiResult)
  };
  it("should resolve the data from spotify", function(done) {
    return getTrackById(
      "authToken",
      "thisisatrackid00",
      spotifyDatasource
    ).then(result => {
      expect(result).toStrictEqual(expectedResult);
      done();
    });
  });
});

const expectedResult = {
  name: "Alaska",
  art: "Image.PNG",
  id: "4HfLQJtVT1KiX1eVedDyTm",
  uri: "spotify:track:4HfLQJtVT1KiX1eVedDyTm",
  artist: {
    id: "2gR0iQTVBPHDKiNn1Kq8HI",
    name: "Ebo Taylor"
  },
  popularity: 65
};

const artist = {
  external_urls: {
    spotify: "https://open.spotify.com/artist/2gR0iQTVBPHDKiNn1Kq8HI"
  },
  href: "https://api.spotify.com/v1/artists/2gR0iQTVBPHDKiNn1Kq8HI",
  id: "2gR0iQTVBPHDKiNn1Kq8HI",
  name: "Ebo Taylor",
  type: "artist",
  uri: "spotify:artist:2gR0iQTVBPHDKiNn1Kq8HI"
};

const spotifyApiResult = {
  album: {
    album_type: "album",
    artists: [artist],
    external_urls: [],
    href: "https://api.spotify.com/v1/albums/5AHWNPo3gllDmixgAoFru4",
    id: "5AHWNPo3gllDmixgAoFru4",
    images: [{ url: "Image.PNG" }],
    name: "Heard It In A Past Life",
    release_date: "2019-01-18",
    release_date_precision: "day",
    total_tracks: 12,
    type: "album",
    uri: "spotify:album:5AHWNPo3gllDmixgAoFru4"
  },
  artists: [artist],
  disc_number: 1,
  duration_ms: 188000,
  explicit: false,
  external_ids: { isrc: "TCACP1637730" },
  external_urls: {
    spotify: "https://open.spotify.com/track/4HfLQJtVT1KiX1eVedDyTm"
  },
  href: "https://api.spotify.com/v1/tracks/4HfLQJtVT1KiX1eVedDyTm",
  id: "4HfLQJtVT1KiX1eVedDyTm",
  is_local: false,
  name: "Alaska",
  popularity: 65,
  preview_url:
    "https://p.scdn.co/mp3-preview/c8f67773594c078ad1973f5c46b1b600981043dc?cid=0e58e71063554851870abd7ea374bd45",
  track_number: 4,
  type: "track",
  uri: "spotify:track:4HfLQJtVT1KiX1eVedDyTm"
};
