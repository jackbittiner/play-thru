import { getKeyByPitchClassAndMode, getHarmonicKeys } from "camelot-wheel";

async function getTrackFeatures(id, datasource) {
  const result = await datasource.get(`audio-features/${id}`);

  const key = getKeyByPitchClassAndMode(result.key, result.mode);

  const harmonicKeys = getHarmonicKeys(result.key, result.mode);

  return {
    key: {
      name: key.name,
      pitchClass: result.key,
      mode: result.mode
    },
    tempo: result.tempo,
    time_signature: result.time_signature,
    harmonicKeys: harmonicKeys
  };
}

export default getTrackFeatures;
