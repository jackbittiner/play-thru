import { RESTDataSource } from "apollo-datasource-rest";

export class SpotifyDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1";
  }

  async getCurrentTrack(authToken) {
    const result = await this.get(`me/player`, undefined, {
      headers: {
        Authorization: "Bearer " + authToken
      }
    });

    return {
      name: result.item.name,
      art: result.item.album.images[0].url,
      id: result.item.id,
      artist: {
        id: result.item.artists[0].id,
        name: result.item.artists[0].name
      }
    };
  }
}
