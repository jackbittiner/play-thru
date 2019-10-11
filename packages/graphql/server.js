import { ApolloServer } from "apollo-server";
import SpotifyDatasource from "./datasources/spotify-datasource";
import typeDefs from "./schema";
import getTrackFeatures from "./resolvers/get-track-features";
import getRecommendations from "./resolvers/get-recommendations";
import playTrack from "./resolvers/play-track";
import getDevices from "./resolvers/get-devices";
import getPlayer from "./resolvers/get-player";
import getTrackById from "./resolvers/get-track-by-id";
import { getTopTracks, getFavourites } from "./resolvers/get-favourites";

const resolvers = {
  Query: {
    track: (_root, { authToken, trackId }, { dataSources: { spotify } }) =>
      getTrackById(authToken, trackId, spotify),
    recommendedTracksByKey: (
      _root,
      { authToken, currentTrack },
      { dataSources: { spotify } }
    ) => getRecommendations(authToken, currentTrack, spotify),
    devices: (_root, { authToken }, { dataSources: { spotify } }) =>
      getDevices(authToken, spotify),
    player: (_root, args) => getPlayer(args),
    favourites: (_root, { authToken }) => getFavourites({ authToken })
  },
  Track: {
    trackFeatures: ({ id }, { authToken }, { dataSources: { spotify } }) =>
      getTrackFeatures(id, authToken, spotify)
  },
  Player: {
    playing: ({ playerInput: { uris } }) => uris,
    start: (
      { playerInput, authToken, device },
      _args,
      { dataSources: { spotify } }
    ) => {
      return playTrack(playerInput, authToken, spotify, device);
    }
  },
  Favourites: {
    tracks: ({ authToken }, _args, { dataSources: { spotify } }) =>
      getTopTracks(authToken, spotify)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    spotify: new SpotifyDatasource()
  })
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
