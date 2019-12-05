import React from "react";
import { mount } from "enzyme";
import Search from "./search";

test("calls getSearchResults after 1 second with the input text", done => {
  const getSearchResultsMock = jest.fn();

  const setSearchBarTextMock = jest.fn();

  const wrapper = mount(
    <Search
      getSearchResults={getSearchResultsMock}
      data={[]}
      loading={false}
      deviceId={"123456789abc"}
      searchBarText={""}
      setSearchBarText={setSearchBarTextMock}
    />
  );

  const input = wrapper.find("input");

  jest.useRealTimers();

  input.simulate("change", { target: { value: "H" } });
  input.simulate("change", { target: { value: "HE" } });
  input.simulate("change", { target: { value: "HEL" } });
  input.simulate("change", { target: { value: "HELL" } });
  input.simulate("change", { target: { value: "HELLO" } });
  setTimeout(() => {
    expect(getSearchResultsMock).toHaveBeenCalledTimes(1);
    expect(getSearchResultsMock).toHaveBeenCalledWith({
      variables: { query: "HELLO" }
    });
    done();
  }, 1100);
});
