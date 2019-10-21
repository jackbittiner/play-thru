import React from "react";
import { shallow } from "enzyme";
import HomePageContainer from "./home-page-container";
import * as getHashParams from "../utils/get-hash-params";

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

    const component = shallow(<HomePageContainer location={location} />);

    expect(sessionStorage.setItem).toHaveBeenLastCalledWith(
      "accessToken",
      "thisistheaccesstoken123456"
    );
  });
});
