async function getCurrentTrack(authToken, trackId, datasource) {
  const result = await datasource.get(`tracks/${trackId}`, undefined, {
    headers: {
      Authorization: "Bearer " + authToken
    }
  });

  return {
    name: result.name,
    art: result.album.images[0].url,
    id: result.id,
    uri: result.uri,
    artist: {
      id: result.artists[0].id,
      name: result.artists[0].name
    },
    popularity: result.popularity
  };
}

export default getCurrentTrack;
