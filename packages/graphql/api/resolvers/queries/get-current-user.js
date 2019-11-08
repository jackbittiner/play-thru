async function getCurrentUser(spotifyDatasource) {
  const me = await spotifyDatasource.get(`me/`);
  return {
    id: me.id,
    isPremium: me.product === "premium"
  };
}

export default getCurrentUser;
