export async function getTopTracks(datasource) {
  const result = await datasource.get(`me/top/${ITEM_TYPE.TRACKS}`);

  const tracks = result.items.map(track => {
    return {
      artist: track.artists[0].name,
      id: track.id,
      name: track.name,
      uri: track.uri,
      art: track.album.images[0].url
    };
  });

  return tracks;
}

export const ITEM_TYPE = {
  TRACKS: "tracks",
  ALBUMS: "albums"
};
