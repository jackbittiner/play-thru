import { ApolloServer } from "apollo-server";
import { SpotifyDatasource } from "./datasources/spotify-datasource";
import typeDefs from "./schema";

const resolvers = {
  Query: {
    currentTrack: (root, { authToken }, { dataSources }) =>
      dataSources.spotifyDatasource.getCurrentTrack(authToken)
  },
  CurrentTrack: {
    trackFeatures: ({ id }, { authToken }, { dataSources }) =>
      dataSources.spotifyDatasource.getTrackFeatures(id, authToken)
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
