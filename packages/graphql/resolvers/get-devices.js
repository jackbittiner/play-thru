async function getDevices(authToken, spotifyDatasource) {
  const result = await spotifyDatasource.get(`/me/player/devices`, undefined, {
    headers: {
      Authorization: "Bearer " + authToken
    }
  });

  return result.devices;
}

export default getDevices;
