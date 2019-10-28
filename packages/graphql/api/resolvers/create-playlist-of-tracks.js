async function createPlaylistOfTracks(trackUris, userId, spotifyDatasource) {
  const header = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const requestBody = {
    name: "PlayThru Setlist"
  };

  const playlist = await spotifyDatasource.post(
    `users/${userId}/playlists`,
    requestBody,
    header
  );

  await spotifyDatasource.post(
    `playlists/${playlist.id}/tracks`,
    {
      uris: trackUris
    },
    header
  );
}

export default createPlaylistOfTracks;
