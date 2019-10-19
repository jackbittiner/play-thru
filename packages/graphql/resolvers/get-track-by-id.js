async function getCurrentTrack(trackId, datasource) {
  const result = await datasource.get(`tracks/${trackId}`);

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
