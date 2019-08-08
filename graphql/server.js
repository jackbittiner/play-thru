import { ApolloServer, gql } from "apollo-server";
import { SpotifyDatasource } from "./datasources/spotify-datasource";

const typeDefs = gql`
  type CurrentTrack {
    name: String!
    art: String
    id: String!
    artist: Artist!
    popularity: Float!
    trackFeatures(authToken: String!): TrackFeatures!
  }

  type Artist {
    id: String!
    name: String!
  }

  type TrackFeatures {
    key: String!
    tempo: Float!
    time_signature: Int!
    harmonicKeys: [Key]!
    danceability: Float!
    energy: Float!
    valence: Float!
  }

  type Key {
    name: String!
    pitchClass: Int!
    mode: Int!
  }

  type Query {
    currentTrack(authToken: String!): CurrentTrack
  }
`;

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
