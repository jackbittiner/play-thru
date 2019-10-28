import { RESTDataSource } from "apollo-datasource-rest";

export default class SpotifyDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.accessToken);
  }
}
