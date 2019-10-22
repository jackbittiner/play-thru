async function createPlaylistOfTracks(trackUris, spotifyDatasource) {
  const me = await spotifyDatasource.get(`me/`);
  const userId = me.id;

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
