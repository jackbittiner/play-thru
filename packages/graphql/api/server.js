import { ApolloServer } from "apollo-server";
import SpotifyDatasource from "./datasources/spotify-datasource";
import typeDefs from "./schema";
import {
  getTrackFeatures,
  getRecommendations,
  playTrack,
  getTrackById,
  getTopTracks,
  getSearchResults,
  createPlaylistOfTrakcs,
  getCurrentUser,
  getRoute
} from "./resolvers";

const resolvers = {
  Query: {
    currentTrack: (_root, { trackId }, { dataSources: { spotify } }) =>
      getTrackById(trackId, spotify),
    recommendedTracksByKey: (
      _root,
      { currentTrack },
      { dataSources: { spotify } }
    ) => getRecommendations(currentTrack, spotify),
    favourites: (_root, _args, { dataSources: { spotify } }) =>
      getTopTracks(spotify),
    searchResults: (_root, { query }, { dataSources: { spotify } }) =>
      getSearchResults(query, spotify),
    account: (_root, _args, { dataSources: { spotify } }) =>
      getCurrentUser(spotify),
    route: (
      _root,
      { startTrackId, endTrackId },
      { dataSources: { spotify } }
    ) => getRoute(startTrackId, endTrackId, spotify)
  },
  CurrentTrack: {
    trackFeatures: ({ id }, _args, { dataSources: { spotify } }) =>
      getTrackFeatures(id, spotify)
  },
  Mutation: {
    playTrack: (
      _root,
      { trackUri, deviceId },
      { dataSources: { spotify } }
    ) => {
      return playTrack(trackUri, deviceId, spotify);
    },
    createPlaylistOfTrakcs: (
      _root,
      { trackUris, userId },
      { dataSources: { spotify } }
    ) => {
      return createPlaylistOfTrakcs(trackUris, userId, spotify);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    spotify: new SpotifyDatasource()
  }),
  context: ({ req }) => {
    const accessToken = req.headers.authorization || "";
    return { accessToken };
  },
  playground: true,
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
