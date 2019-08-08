import { RESTDataSource } from "apollo-datasource-rest";
import { getHarmonicKeys, getKeyName } from "./camelot-wheel";

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
      },
      popularity: result.item.popularity
    };
  }

  async getTrackFeatures(id, authToken) {
    const result = await this.get(`audio-features/${id}`, undefined, {
      headers: {
        Authorization: "Bearer " + authToken
      }
    });

    return {
      key: getKeyName(result.key, result.mode),
      tempo: result.tempo,
      time_signature: result.time_signature,
      harmonicKeys: getHarmonicKeys(result.key, result.mode),
      danceability: result.danceability,
      energy: result.energy,
      valence: result.valence
    };
  }
}
