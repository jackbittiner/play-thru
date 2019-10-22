import React from "react";
import { mount } from "enzyme";
import { CREATE_PLAYLIST_OF_TRACKS } from "./create-playlist-of-tracks";
import Setlist from "./index";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";

describe("Setlist", () => {
  it("should make a playlist with songs that have been played", async () => {
    let mutationCalled = false;

    const mocks = [
      {
        request: {
          query: CREATE_PLAYLIST_OF_TRACKS,
          variables: {
            trackUris: ["track1", "track2", "track3"]
          }
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              createPlaylistOfTrakcs: null
            }
          };
        }
      }
    ];

    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Setlist
          setlist={[
            { name: "track1", uri: "track1" },
            { name: "track2", uri: "track2" },
            { name: "track3", uri: "track3" }
          ]}
        />
      </MockedProvider>
    );

    const button = component.find("button");
    button.simulate("click");

    await wait(0);
    component.update();
    expect(mutationCalled).toBe(true);
  });
});
