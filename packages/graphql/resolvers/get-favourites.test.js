import { getTopTracks } from "./get-favourites";

describe("getTopTracks", function() {
  const spotifyDatasource = {
    get: jest.fn(() => spotifyApiResult)
  };
  it("should get and return a list of favourite tracks", function(done) {
    return getTopTracks(spotifyDatasource).then(result => {
      expect(result).toStrictEqual(expectedResult);
      done();
    });
  });
});

const expectedResult = [
  {
    id: "4h5m56ExHLPUC9NGz7U1Qa",
    name: "Candy",
    uri: "spotify:track:4h5m56ExHLPUC9NGz7U1Qa",
    artist: "Paolo Nutini",
    art: "https://i.scdn.co/image/823897bdb45e4fde4e136ee61ca6795c35c60609"
  },
  {
    id: "1aggpYdCtKbiq6LKxixLaM",
    name: "New Life",
    uri: "spotify:track:1aggpYdCtKbiq6LKxixLaM",
    artist: "Yawwn",
    art: "https://i.scdn.co/image/466720048b689679250c42346ee515057189a78d"
  }
];

const spotifyApiResult = {
  items: [
    {
      album: {
        album_type: "ALBUM",
        artists: [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/7x5rK9BClDQ8wmCkYAGsQp"
            },
            href: "https://api.spotify.com/v1/artists/7x5rK9BClDQ8wmCkYAGsQp",
            id: "7x5rK9BClDQ8wmCkYAGsQp",
            name: "Paolo Nutini",
            type: "artist",
            uri: "spotify:artist:7x5rK9BClDQ8wmCkYAGsQp"
          }
        ],
        external_urls: {
          spotify: "https://open.spotify.com/album/6phMKMOoIv4CLmOH5m7Lj3"
        },
        href: "https://api.spotify.com/v1/albums/6phMKMOoIv4CLmOH5m7Lj3",
        id: "6phMKMOoIv4CLmOH5m7Lj3",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/823897bdb45e4fde4e136ee61ca6795c35c60609",
            width: 640
          },
          {
            height: 300,
            url:
              "https://i.scdn.co/image/840768b485619f4c8347eef7f1d198c02ba102d9",
            width: 300
          },
          {
            height: 64,
            url:
              "https://i.scdn.co/image/d232cc2f776dc55935f4cb82f1d363f7f4442356",
            width: 64
          }
        ],
        name: "Sunny Side Up",
        release_date: "2009-05-29",
        release_date_precision: "day",
        total_tracks: 14,
        type: "album",
        uri: "spotify:album:6phMKMOoIv4CLmOH5m7Lj3"
      },
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/7x5rK9BClDQ8wmCkYAGsQp"
          },
          href: "https://api.spotify.com/v1/artists/7x5rK9BClDQ8wmCkYAGsQp",
          id: "7x5rK9BClDQ8wmCkYAGsQp",
          name: "Paolo Nutini",
          type: "artist",
          uri: "spotify:artist:7x5rK9BClDQ8wmCkYAGsQp"
        }
      ],
      disc_number: 1,
      duration_ms: 298693,
      explicit: false,
      external_ids: {
        isrc: "GBAHS0900136"
      },
      external_urls: {
        spotify: "https://open.spotify.com/track/4h5m56ExHLPUC9NGz7U1Qa"
      },
      href: "https://api.spotify.com/v1/tracks/4h5m56ExHLPUC9NGz7U1Qa",
      id: "4h5m56ExHLPUC9NGz7U1Qa",
      is_local: false,
      name: "Candy",
      popularity: 63,
      preview_url:
        "https://p.scdn.co/mp3-preview/71428b00d4e023b7ccf30161e5c5f2ac86d23b70?cid=774b29d4f13844c495f206cafdad9c86",
      track_number: 4,
      type: "track",
      uri: "spotify:track:4h5m56ExHLPUC9NGz7U1Qa"
    },
    {
      album: {
        album_type: "SINGLE",
        artists: [
          {
            external_urls: {
              spotify: "https://open.spotify.com/artist/36ozfiBIXpfHnTkdr48QpJ"
            },
            href: "https://api.spotify.com/v1/artists/36ozfiBIXpfHnTkdr48QpJ",
            id: "36ozfiBIXpfHnTkdr48QpJ",
            name: "Yawwn",
            type: "artist",
            uri: "spotify:artist:36ozfiBIXpfHnTkdr48QpJ"
          }
        ],
        external_urls: {
          spotify: "https://open.spotify.com/album/4Hvq36OX0jWcUfZfxQzA50"
        },
        href: "https://api.spotify.com/v1/albums/4Hvq36OX0jWcUfZfxQzA50",
        id: "4Hvq36OX0jWcUfZfxQzA50",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/466720048b689679250c42346ee515057189a78d",
            width: 640
          },
          {
            height: 300,
            url:
              "https://i.scdn.co/image/fe2117bf5f26c23feb922bb453ea7557553d608b",
            width: 300
          },
          {
            height: 64,
            url:
              "https://i.scdn.co/image/774cb0ce23de05a6e00f4bb3b4bf5fcd270c4adb",
            width: 64
          }
        ],
        name: "New Life",
        release_date: "2019-04-19",
        release_date_precision: "day",
        total_tracks: 1,
        type: "album",
        uri: "spotify:album:4Hvq36OX0jWcUfZfxQzA50"
      },
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/36ozfiBIXpfHnTkdr48QpJ"
          },
          href: "https://api.spotify.com/v1/artists/36ozfiBIXpfHnTkdr48QpJ",
          id: "36ozfiBIXpfHnTkdr48QpJ",
          name: "Yawwn",
          type: "artist",
          uri: "spotify:artist:36ozfiBIXpfHnTkdr48QpJ"
        }
      ],
      disc_number: 1,
      duration_ms: 169000,
      explicit: false,
      external_ids: {
        isrc: "GBKPL1947428"
      },
      external_urls: {
        spotify: "https://open.spotify.com/track/1aggpYdCtKbiq6LKxixLaM"
      },
      href: "https://api.spotify.com/v1/tracks/1aggpYdCtKbiq6LKxixLaM",
      id: "1aggpYdCtKbiq6LKxixLaM",
      is_local: false,
      name: "New Life",
      popularity: 4,
      preview_url:
        "https://p.scdn.co/mp3-preview/6c573e56ce18d585da6e2ea17bda42b1bce8b316?cid=774b29d4f13844c495f206cafdad9c86",
      track_number: 1,
      type: "track",
      uri: "spotify:track:1aggpYdCtKbiq6LKxixLaM"
    }
  ],
  total: 50,
  limit: 20,
  offset: 0,
  previous: null,
  href: "https://api.spotify.com/v1/me/top/tracks",
  next: "https://api.spotify.com/v1/me/top/tracks?limit=20&offset=20"
};
