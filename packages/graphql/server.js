import { ApolloServer } from 'apollo-server';
import SpotifyDatasource from './datasources/spotify-datasource';
import typeDefs from './schema';
import getCurrentTrack from './resolvers/get-current-track';
import getTrackFeatures from './resolvers/get-track-features';
import getRecommendations from './resolvers/get-recommendations';
import playTrack from './resolvers/play-track';
import getDevices from './resolvers/get-devices';
import getPlayer from './resolvers/get-player';

const resolvers = {
  Query: {
    currentTrack: (_root, { authToken }, { dataSources: { spotify } }) =>
      getCurrentTrack(authToken, spotify),
    recommendedTracksByKey: (
      _root,
      { authToken, currentTrack },
      { dataSources: { spotify } }
    ) => getRecommendations(authToken, currentTrack, spotify),
    devices: (_root, { authToken }, { dataSources: { spotify } }) =>
      getDevices(authToken, spotify),
    player: (_root, args) => getPlayer(args)
  },
  CurrentTrack: {
    trackFeatures: ({ id }, { authToken }, { dataSources: { spotify } }) =>
      getTrackFeatures(id, authToken, spotify)
  },
  Player: {
    start: (
      { playerInput, authToken },
      _args,
      { dataSources: { spotify } }
    ) => {
      return playTrack(playerInput, authToken, spotify);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    spotify: new SpotifyDatasource()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
