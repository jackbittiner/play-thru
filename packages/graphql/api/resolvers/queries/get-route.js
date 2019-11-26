import { getCamelotRoute } from "camelot-wheel";

async function getRoute(startTrackId, endTrackId, datasource) {
  const trackA = await datasource.get(`audio-features/${startTrackId}`);
  const trackB = await datasource.get(`audio-features/${endTrackId}`);

  const trackAdetails = {
    pitchClass: trackA.key,
    mode: trackA.mode
  };

  const trackBdetails = {
    pitchClass: trackB.key,
    mode: trackB.mode
  };

  const camelotRoute = getCamelotRoute(trackAdetails, trackBdetails);

  let seedTrackId = startTrackId;

  let inbetweenTracks = [];

  for await (let key of camelotRoute) {
    const requestBody = {
      limit: 1,
      min_key: key.pitchClass,
      max_key: key.pitchClass,
      min_mode: key.mode,
      max_mode: key.mode,
      seed_tracks: seedTrackId
    };

    const result = await datasource.get(`recommendations`, requestBody);

    const recommendedTrack = result.tracks.map(track => {
      return {
        artistName: track.artists[0].name,
        id: track.id,
        name: track.name,
        uri: track.uri,
        art: track.album.images[0].url,
        mode: key.mode,
        camelotPosition: key.camelotPosition
      };
    });

    inbetweenTracks.push(recommendedTrack[0]);

    seedTrackId = result.tracks[0].id;
  }

  return inbetweenTracks;
}

export default getRoute;
