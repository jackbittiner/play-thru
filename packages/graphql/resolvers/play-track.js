async function playTrack(track, deviceId, setlist, spotifyDatasource) {
  const deviceQueryParam = deviceId ? `?device_id=` + deviceId : "";

  try {
    await spotifyDatasource.put(`me/player/play` + deviceQueryParam, {
      uris: [track.uri]
    });

    setlist.push(track);

    return {
      status: "success",
      track,
      deviceId,
      setlist: setlist
    };
  } catch (error) {
    const response = {
      status: "error: " + error,
      track,
      deviceId,
      setlist: setlist
    };
    return response;
  }
}

export default playTrack;
