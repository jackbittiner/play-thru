import { getHarmonicKeys, getKeyName } from "./camelot-wheel";

async function getTrackFeatures(id, authToken, datasource) {
  const result = await datasource.get(`audio-features/${id}`, undefined, {
    headers: {
      Authorization: "Bearer " + authToken
    }
  });

  return {
    key: {
      name: getKeyName(result.key, result.mode),
      pitchClass: result.key,
      mode: result.mode
    },
    tempo: result.tempo,
    time_signature: result.time_signature,
    harmonicKeys: getHarmonicKeys(result.key, result.mode)
  };
}

export default getTrackFeatures;
