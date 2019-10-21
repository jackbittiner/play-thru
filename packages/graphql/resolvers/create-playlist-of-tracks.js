async function createPlaylistOfTracks(trackUris, spotifyDatasource) {
  const me = await spotifyDatasource.get(`me/`);
  const userId = me.id;

  const requestBody = {
    name: "PlayThru Setlist"
  };

  const result = await spotifyDatasource.post(
    `users/${userId}/playlists`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  console.log(result);
}

export default createPlaylistOfTracks;
