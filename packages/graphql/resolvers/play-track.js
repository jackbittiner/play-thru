async function playTrack(playerInput, authToken, spotifyDatasource) {
  const result = await spotifyDatasource.put(`me/player/play`, playerInput, {
    headers: {
      Authorization: "Bearer " + authToken
    }
  });

  /// find way to return successful or error state
  return result && { start: "success" };
}

export default playTrack;
