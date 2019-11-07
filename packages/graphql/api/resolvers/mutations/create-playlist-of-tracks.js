const header = {
  headers: {
    "Content-Type": "application/json"
  }
};

async function createPlaylistOfTracks(trackUris, userId, spotifyDatasource) {
  const playlist = await createPlaylist(userId, spotifyDatasource);
  await spotifyDatasource.post(
    `playlists/${playlist.id}/tracks`,
    {
      uris: trackUris
    },
    header
  );
}

export async function createPlaylist(userId, spotifyDatasource) {
  const requestBody = {
    name: "PlayThru Setlist"
  };

  const playlist = await spotifyDatasource.post(
    `users/${userId}/playlists`,
    requestBody,
    header
  );

  return playlist;
}

export default createPlaylistOfTracks;
