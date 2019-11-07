async function getCurrentUser(spotifyDatasource) {
  const me = await spotifyDatasource.get(`me/`);
  return {
    id: me.id
  };
}

export default getCurrentUser;
