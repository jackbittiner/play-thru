import { getKey, getHarmonicKeys } from "camelot-wheel";

async function getTrackFeatures(id, datasource) {
  const result = await datasource.get(`audio-features/${id}`);

  const key = getKey({ pitchClass: result.key, mode: result.mode });

  const harmonicKeys = getHarmonicKeys({
    pitchClass: result.key,
    mode: result.mode
  });

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
