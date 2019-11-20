async function getRoute(startTrackId, endTrackId, datasource) {
  const trackA = await datasource.get(`audio-features/${startTrackId}`);
  const trackB = await datasource.get(`audio-features/${endTrackId}`);

  return "Hello";
}

export default getRoute;
