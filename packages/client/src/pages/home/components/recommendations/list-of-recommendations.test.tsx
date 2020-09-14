import React from "react";
import { mount } from "enzyme";
import { GET_RECOMMENDATIONS } from "./get-recommendations";
import ListsOfRecommendations from "./list-of-recommendations";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";
import { TrackFeatures, Artist, Key } from "../../../../common/spotify-types";

describe("List Of Recommendations", () => {
  it("should render all the different keys and recommendations", async () => {
    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListsOfRecommendations currentTrack={currentTrack} />
      </MockedProvider>
    );

    await wait(0);
    component.update();
    expect(component.find("RecommendationsByKey").length).toBe(2);
  });
});

const artist: Artist = {
  id: "13131",
  name: "Sean da Paul",
};

const key: Key = {
  name: "a",
  pitchClass: 1,
  mode: 2,
};

const trackFeatures: TrackFeatures = {
  key,
  tempo: 100,
  time_signature: 4,
  harmonicKeys: [key],
};

const currentTrack = {
  name: "Hi there",
  art: "some art.png",
  id: "asdfgh123456",
  uri: "12345",
  artist,
  popularity: 0.786,
  trackFeatures,
};

const mocks = [
  {
    request: {
      query: GET_RECOMMENDATIONS,
      variables: { currentTrack: currentTrack },
    },
    result: {
      data: {
        recommendedTracksByKey: [
          {
            key: {
              name: "Cm",
              pitchClass: "C",
              mode: 0,
            },
            recommendedTracks: [
              {
                artist: "Sean da Paul",
                id: "asdfg12345",
                name: "temperature",
                uri: "asdfghj1234567",
                art: "some art.png",
              },
            ],
          },
          {
            key: {
              name: "Dm",
              pitchClass: "D",
              mode: 0,
            },
            recommendedTracks: [
              {
                artist: "Blu Cantrell",
                id: "asdfg12345asd",
                name: "Breathe",
                uri: "asd134987s",
                art: "some art.jpg",
              },
            ],
          },
        ],
      },
    },
  },
];
