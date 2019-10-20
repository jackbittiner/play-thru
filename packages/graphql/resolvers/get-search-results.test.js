import getSearchResults from "./get-search-results";

describe("getTrackById", function() {
  const spotifyDatasource = {
    get: jest.fn(() => spotifyApiResult)
  };
  it("should resolve the data from spotify", function(done) {
    return getSearchResults("hello", spotifyDatasource).then(result => {
      expect(result).toStrictEqual(expectedResult);
      done();
    });
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
