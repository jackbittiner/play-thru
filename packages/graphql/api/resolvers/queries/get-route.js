import { getCamelotRoute } from "camelot-wheel";

async function getRoute(startTrackId, endTrackId, datasource) {
  const trackA = await datasource.get(`audio-features/${startTrackId}`);
  const trackB = await datasource.get(`audio-features/${endTrackId}`);

  const trackADetails = {
    pitchClass: trackA.key,
    mode: trackA.mode
  };

  const trackBDetails = {
    pitchClass: trackB.key,
    mode: trackB.mode
  };

  const camelotRoute = getCamelotRoute(trackADetails, trackBDetails);

  let seedTrackId = startTrackId;

  const differenceBetweenBPM = trackB.tempo - trackA.tempo;
  const numberOfSteps = camelotRoute.length + 1;

  const averageBPMJumpForEachStep = differenceBetweenBPM / numberOfSteps;

  let requestBPM = trackA.tempo + averageBPMJumpForEachStep;

  let inbetweenTracks = [];

  for (let key of camelotRoute) {
    const requestBody = {
      limit: 1,
      min_key: key.pitchClass,
      max_key: key.pitchClass,
      min_mode: key.mode,
      max_mode: key.mode,
      seed_tracks: seedTrackId,
      target_tempo: requestBPM
    };

    const result = await datasource.get(`recommendations`, requestBody);

    const resultFeatures = await datasource.get(
      `audio-features/${result.tracks[0].id}`
    );

    const tempo = resultFeatures.tempo;

    const recommendedTrack = result.tracks.map(track => {
      return {
        artistName: track.artists[0].name,
        id: track.id,
        name: track.name,
        uri: track.uri,
        art: track.album.images[0].url,
        mode: key.mode,
        camelotPosition: key.camelotPosition,
        tempo: tempo
      };
    });

    inbetweenTracks.push(recommendedTrack[0]);

    seedTrackId = result.tracks[0].id;

    requestBPM = requestBPM + averageBPMJumpForEachStep;
  }

  return inbetweenTracks;
}

export default getRoute;
