import React from "react";
import { mount } from "enzyme";
import HomePageContainer from "./home-page-container";
import * as getHashParams from "../utils/get-hash-params";
import { MockedProvider } from "@apollo/react-testing";

describe("HomePageContainer", () => {
  it("should add accessToken to session storage if present in URL", () => {
    const location = {
      pathname: "/home/",
      search: "",
      hash: "#access_token=thisistheaccesstoken123456&token_type=Bearer",
      state: undefined
    };

    getHashParams.default = jest.fn().mockImplementation(() => {
      return {
        access_token: "thisistheaccesstoken123456",
        token_type: "Bearer"
      };
    });

    const component = mount(
      <MockedProvider>
        <HomePageContainer location={location} />
      </MockedProvider>
    );

    expect(sessionStorage.setItem).toHaveBeenLastCalledWith(
      "accessToken",
      "thisistheaccesstoken123456"
    );
  });
});
