async function playTrack(playerInput, authToken, spotifyDatasource, device) {
  const specifyDevice = device ? `?device=${device}` : "";
  const result = await spotifyDatasource.put(
    `me/player/play` + specifyDevice,
    playerInput,
    {
      headers: {
        Authorization: "Bearer " + authToken
      }
    }
  );

  /// find way to return successful or error state
  return result && { start: "success" };
}

export default playTrack;
