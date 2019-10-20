async function getRecommendations(currentTrack, datasource) {
  const recommendationsByKey = currentTrack.trackFeatures.harmonicKeys.map(
    async key => {
      const requestBody = {
        limit: 5,
        min_key: key.pitchClass,
        max_key: key.pitchClass,
        min_mode: key.mode,
        max_mode: key.mode,
        min_tempo: currentTrack.trackFeatures.tempo - 10,
        max_tempo: currentTrack.trackFeatures.tempo + 10,
        seed_tracks: [currentTrack.id]
      };

      const result = await datasource.get(`recommendations`, requestBody);

      const recommendedTracks = result.tracks.map(track => {
        return {
          artist: track.artists[0].name,
          id: track.id,
          name: track.name,
          uri: track.uri,
          art: track.album.images[0].url
        };
      });

      const recommendationByKey = {
        key: key,
        recommendedTracks: recommendedTracks
      };

      return recommendationByKey;
    }
  );

  const recommendations = await Promise.all(recommendationsByKey);

  return recommendations;
}

export default getRecommendations;
