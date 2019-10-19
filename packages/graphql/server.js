import { ApolloServer } from "apollo-server";
import SpotifyDatasource from "./datasources/spotify-datasource";
import typeDefs from "./schema";
import getTrackFeatures from "./resolvers/get-track-features";
import getRecommendations from "./resolvers/get-recommendations";
import playTrack from "./resolvers/play-track";
import getPlayer from "./resolvers/get-player";
import getTrackById from "./resolvers/get-track-by-id";
import { getTopTracks } from "./resolvers/get-favourites";
import getSearchResults from "./resolvers/get-search-results";

const resolvers = {
  Query: {
    currentTrack: (_root, { trackId }, { dataSources: { spotify } }) =>
      getTrackById(trackId, spotify),
    recommendedTracksByKey: (
      _root,
      { currentTrack },
      { dataSources: { spotify } }
    ) => getRecommendations(currentTrack, spotify),
    player: (_root, args) => getPlayer(args),
    favourites: (_root, _args, { dataSources: { spotify } }) =>
      getTopTracks(spotify),
    searchResults: (_root, { query }, { dataSources: { spotify } }) =>
      getSearchResults(query, spotify)
  },
  CurrentTrack: {
    trackFeatures: ({ id }, _args, { dataSources: { spotify } }) =>
      getTrackFeatures(id, spotify)
  },
  Player: {
    playing: ({ playerInput: { uris } }) => uris,
    start: ({ playerInput, device }, _args, { dataSources: { spotify } }) => {
      return playTrack(playerInput, spotify, device);
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
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
