import getHashParams from "./get-hash-params";
import expectExport from "expect";

describe("getHashParams", () => {
  it("returns the hash params from the location", () => {
    const location = {
      pathname: "/home/",
      search: "",
      hash: "#access_token=thisistheaccesstoken123456&token_type=Bearer",
      state: undefined
    };

    const expectedResult = {
      access_token: "thisistheaccesstoken123456",
      token_type: "Bearer"
    };

    expectExport(getHashParams(location)).toStrictEqual(expectedResult);
  });
});
