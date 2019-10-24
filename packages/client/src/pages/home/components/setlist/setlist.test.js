import React from "react";
import { mount } from "enzyme";
import { CREATE_PLAYLIST_OF_TRACKS } from "./create-playlist-of-tracks";
import Setlist from "./index";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";
import * as getSetlist from "./get-setlist";

describe("Setlist", () => {
  it("should make a playlist with songs that have been played", async () => {
    let mutationCalled = false;

    const mocks = [
      {
        request: {
          query: CREATE_PLAYLIST_OF_TRACKS,
          variables: {
            trackUris: ["track1"],
            userId: "jbitts"
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

    getSetlist.getSetlist = jest.fn().mockImplementation(() => {
      return [{ name: "track1", uri: "track1" }];
    });

    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Setlist
          currentTrack={[{ name: "track1", uri: "track1" }]}
          userId={"jbitts"}
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
