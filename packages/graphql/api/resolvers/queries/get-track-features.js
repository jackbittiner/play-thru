import { getHarmonicKeys, getKeyName } from "../camelot-wheel/camelot-wheel";

async function getTrackFeatures(id, datasource) {
  const result = await datasource.get(`audio-features/${id}`);

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
