import { ApolloServer } from "apollo-server";
import SpotifyDatasource from "./datasources/spotify-datasource";
import typeDefs from "./schema";
import getTrackFeatures from "./resolvers/get-track-features";
import getRecommendations from "./resolvers/get-recommendations";
import playTrack from "./resolvers/play-track";
import getTrackById from "./resolvers/get-track-by-id";
import { getTopTracks } from "./resolvers/get-favourites";
import getSearchResults from "./resolvers/get-search-results";
import createPlaylistOfTrakcs from "./resolvers/create-playlist-of-tracks";
import getCurrentUser from "./resolvers/get-current-user";

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
      getCurrentUser(spotify)
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
