import React from "react";
import { mount } from "enzyme";
import { GET_TOP_TRACKS } from "./get-top-tracks";
import TopTracks from "./index";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";

describe("Top Tracks", () => {
  it("should render all users top tracks", async () => {
    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TopTracks deviceId={"deviceId1234"} />
      </MockedProvider>
    );

    await wait(0);
    component.update();
    expect(component.find("Track").length).toBe(2);
  });
});

const mocks = [
  {
    request: {
      query: GET_TOP_TRACKS,
    },
    result: {
      data: {
        favourites: [
          {
            artist: "Sean da Paul",
            id: "asdfg12345",
            name: "temperature",
            uri: "asdfghj1234567",
            art: "some art.png",
          },
          {
            artist: "Blu Cantrell",
            id: "asdfg12345asd",
            name: "Breathe",
            uri: "asd134987s",
            art: "some art.jpg",
          },
        ],
      },
    },
  },
];
