async function playTrack(playerInput, spotifyDatasource, device) {
  const deviceQueryParam = device ? `?device_id=` + device : "";

  await spotifyDatasource.put(`me/player/play` + deviceQueryParam, playerInput);

  /// find way to return successful or error state
  return "success";
}

export default playTrack;
