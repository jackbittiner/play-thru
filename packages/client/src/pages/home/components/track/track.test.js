import React from "react";
import { mount } from "enzyme";
import { CHANGE_TRACK } from "./change-track";
import Track from "./index";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";

describe("Track", () => {
  it("should play a new track when clicked", async () => {
    let lazyQueryCalled = false;

    const mocks = [
      {
        request: {
          query: CHANGE_TRACK,
          variables: {
            playerInput: { uris: ["asdfgh12"] },
            device: "12345asdfgh"
          }
        },
        result: () => {
          lazyQueryCalled = true;
          return { data: { player: { start: true, playing: true } } };
        }
      }
    ];

    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Track
          track={{ name: "song", artist: "artist", uri: "asdfgh12" }}
          deviceId={"12345asdfgh"}
        />
      </MockedProvider>
    );

    const button = component.find("button");
    button.simulate("click");

    await wait(0);
    component.update();
    expect(lazyQueryCalled).toBe(true);
  });
});
