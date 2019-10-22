import React from "react";
import { mount } from "enzyme";
import Track from "./index";

test("plays song with correct variables", () => {
  const changeTrackMock = jest.fn();

  const wrapper = mount(
    <Track
      track={{
        artist: "something",
        id: "123456",
        name: "name",
        uri: "spotify:track:11dFghVXANMlKmJXsNCbNl",
        art: "String!"
      }}
      deviceId={"deviceId1234"}
      changeTrack={changeTrackMock}
      setlist={[]}
    />
  );

  const button = wrapper.find("button");

  button.simulate("click");
  expect(changeTrackMock).toHaveBeenCalledTimes(1);
  expect(changeTrackMock).toHaveBeenCalledWith({
    variables: {
      track: {
        artist: "something",
        id: "123456",
        name: "name",
        uri: "spotify:track:11dFghVXANMlKmJXsNCbNl",
        art: "String!"
      },
      deviceId: "deviceId1234",
      setlist: []
    }
  });
});
