import { ApolloServer } from "apollo-server";
import SpotifyDatasource from "./datasources/spotify-datasource";
import typeDefs from "./schema";
import getCurrentTrack from "./resolvers/get-current-track";
import getTrackFeatures from "./resolvers/get-track-features";
import getRecommendations from "./resolvers/get-recommendations";

const resolvers = {
  Query: {
    currentTrack: (
      root,
      { authToken },
      { dataSources: { spotifyDatasource } }
    ) => getCurrentTrack(authToken, spotifyDatasource),
    recommendedTracksByKey: (
      root,
      { authToken, currentTrack },
      { dataSources: { spotifyDatasource } }
    ) => getRecommendations(authToken, currentTrack, spotifyDatasource)
  },
  CurrentTrack: {
    trackFeatures: (
      { id },
      { authToken },
      { dataSources: { spotifyDatasource } }
    ) => getTrackFeatures(id, authToken, spotifyDatasource)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    spotifyDatasource: new SpotifyDatasource()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
