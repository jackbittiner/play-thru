import getSearchResults from "./get-search-results";

describe("getTrackById", function() {
  const spotifyDatasource = {
    get: jest.fn(() => spotifyApiResult)
  };
  let expected;
  let apiResult;

  beforeEach(() => {
    expected = expectedResult;
    apiResult = spotifyApiResult;
  });

  it("should resolve the data from spotify", async () => {
    const result = await getSearchResults("hello", spotifyDatasource);
    expect(result).toEqual(expected);
  });

  it("should handle an api result with no images", async () => {
    apiResult.tracks.items[0].album.images = [];

    delete expected[0].art;
    const result = await getSearchResults("hello", spotifyDatasource);
    expect(result).toEqual(expected);
  });
});

const expectedResult = [
  {
    name: "Hello",
    art: "Image.PNG",
    id: "4HfLQJtVT1KiX1eVedDyTm",
    uri: "spotify:track:4HfLQJtVT1KiX1eVedDyTm",
    artist: "Lionel Richtea"
  },
  {
    name: "Hello",
    art: "Image.PNG",
    id: "4HfLQJtVT1KiX1eVedDyTm",
    uri: "spotify:track:4HfLQJtVT1KiX1eVedDyTm",
    artist: "Adele"
  }
];

const spotifyApiResult = {
  tracks: {
    items: [
      {
        artists: [
          {
            name: "Lionel Richtea"
          }
        ],
        name: "Hello",
        id: "4HfLQJtVT1KiX1eVedDyTm",
        uri: "spotify:track:4HfLQJtVT1KiX1eVedDyTm",
        album: {
          images: [
            {
              url: "Image.PNG"
            }
          ]
        }
      },
      {
        artists: [
          {
            name: "Adele"
          }
        ],
        name: "Hello",
        id: "4HfLQJtVT1KiX1eVedDyTm",
        uri: "spotify:track:4HfLQJtVT1KiX1eVedDyTm",
        album: {
          images: [
            {
              url: "Image.PNG"
            }
          ]
        }
      }
    ]
  }
};
