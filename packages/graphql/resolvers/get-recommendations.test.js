import getRecommendations from "./get-recommendations";

describe("getRecommendations", function() {
  const spotifyDatasource = {
    get: jest.fn(() => spotifyApiResult)
  };
  it("should resolve the data from spotify", function(done) {
    return getRecommendations("authToken", trackInput, spotifyDatasource).then(
      result => {
        expect(result).toStrictEqual(expectedResult);
        done();
      }
    );
  });
});

const expectedResult = [
  {
    key: { mode: 1, name: "A", pitchClass: 9 },
    recommendedTracks: [
      {
        artist: "Ebo Taylor",
        id: "5A7eooPKJHtr0UJmatjH4a",
        name: "Another Brick in the Wall, Pt. 3",
        uri: "spotify:track:5A7eooPKJHtr0UJmatjH4a",
        art: "something.png"
      }
    ]
  },
  {
    key: { mode: 1, name: "D", pitchClass: 2 },
    recommendedTracks: [
      {
        artist: "Ebo Taylor",
        id: "5A7eooPKJHtr0UJmatjH4a",
        name: "Another Brick in the Wall, Pt. 3",
        uri: "spotify:track:5A7eooPKJHtr0UJmatjH4a",
        art: "something.png"
      }
    ]
  },
  {
    key: { mode: 1, name: "E", pitchClass: 4 },
    recommendedTracks: [
      {
        artist: "Ebo Taylor",
        id: "5A7eooPKJHtr0UJmatjH4a",
        name: "Another Brick in the Wall, Pt. 3",
        uri: "spotify:track:5A7eooPKJHtr0UJmatjH4a",
        art: "something.png"
      }
    ]
  },
  {
    key: { mode: 0, name: "Gbm", pitchClass: 6 },
    recommendedTracks: [
      {
        artist: "Ebo Taylor",
        id: "5A7eooPKJHtr0UJmatjH4a",
        name: "Another Brick in the Wall, Pt. 3",
        uri: "spotify:track:5A7eooPKJHtr0UJmatjH4a",
        art: "something.png"
      }
    ]
  }
];

const trackInput = {
  art: "https://i.scdn.co/image/8d5eabf813797aa39f6e8186f702a1998d12fe40",
  artist: {
    id: "0k17h0D3J5VfsdmQ1iZtE9",
    name: "Pink Floyd"
  },
  id: "1KaIRTf1YEWt54V3IW34qV",
  name: "In The Flesh? - 2011 Remastered Version",
  popularity: 49,
  trackFeatures: {
    danceability: 0.294,
    energy: 0.489,
    harmonicKeys: [
      { name: "A", pitchClass: 9, mode: 1 },
      { name: "D", pitchClass: 2, mode: 1 },
      { name: "E", pitchClass: 4, mode: 1 },
      { name: "Gbm", pitchClass: 6, mode: 0 }
    ],
    key: {
      mode: 1,
      name: "A",
      pitchClass: 9
    },
    tempo: 152.115,
    time_signature: 3,
    valence: 0.268
  }
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
  tracks: [
    {
      album: {
        images: [{ url: "something.png" }]
      },
      artists: [artist],
      disc_number: 1,
      duration_ms: 74411,
      explicit: false,
      href: "https://api.spotify.com/v1/tracks/5A7eooPKJHtr0UJmatjH4a",
      id: "5A7eooPKJHtr0UJmatjH4a",
      is_local: false,
      name: "Another Brick in the Wall, Pt. 3",
      popularity: 54,
      preview_url:
        "https://p.scdn.co/mp3-preview/26834eff5ba1b4e8ce0bc71b4068bb8190a5575f?cid=0e58e71063554851870abd7ea374bd45",
      track_number: 12,
      type: "track",
      uri: "spotify:track:5A7eooPKJHtr0UJmatjH4a"
    }
  ]
};
