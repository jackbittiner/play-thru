import getCurrentUser from "./get-current-user";

describe("getCurrentUser", function() {
  const spotifyDatasource = {
    get: jest.fn(() => spotifyApiResult)
  };
  it("should get the current user id", function(done) {
    return getCurrentUser(spotifyDatasource).then(result => {
      expect(result).toStrictEqual({ id: "jbitts69", isPremium: true });
      done();
    });
  });
});

const spotifyApiResult = {
  id: "jbitts69",
  product: "premium"
};
