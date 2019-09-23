async function playTrack(playerInput, authToken, spotifyDatasource, device) {
  const deviceQueryParam = `?device_id=` + device;

  await spotifyDatasource.put(
    `me/player/play` + deviceQueryParam,
    playerInput,
    {
      headers: {
        Authorization: "Bearer " + authToken
      }
    }
  );

  /// find way to return successful or error state
  return "success";
}

export default playTrack;
