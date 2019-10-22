async function playTrack(trackUri, deviceId, spotifyDatasource) {
  const deviceQueryParam = deviceId ? `?device_id=` + deviceId : "";

  try {
    await spotifyDatasource.put(`me/player/play` + deviceQueryParam, {
      uris: [trackUri]
    });
    return { status: "success", trackUri, deviceId };
  } catch (error) {
    const response = {
      status: "error: " + error,
      trackUri,
      deviceId
    };
    return response;
  }
}

export default playTrack;
