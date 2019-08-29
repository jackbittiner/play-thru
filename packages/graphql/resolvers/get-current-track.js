async function getCurrentTrack(authToken, datasource) {
  const result = await datasource.get(`me/player`, undefined, {
    headers: {
      Authorization: "Bearer " + authToken
    }
  });

  return {
    name: result.item.name,
    art: result.item.album.images[0].url,
    id: result.item.id,
    uri: result.item.uri,
    artist: {
      id: result.item.artists[0].id,
      name: result.item.artists[0].name
    },
    popularity: result.item.popularity
  };
}

export default getCurrentTrack;
