import { ApolloServer, gql } from "apollo-server";
import { SpotifyDatasource } from "./datasources/spotify-datasource";

const typeDefs = gql`
  type CurrentTrack {
    name: String!
    art: String
    id: String!
    artist: Artist!
  }

  type Artist {
    id: String!
    name: String!
  }

  type Query {
    currentTrack(authToken: String!): CurrentTrack
  }
`;

const resolvers = {
  Query: {
    currentTrack: (root, { authToken }, { dataSources }) =>
      dataSources.spotifyDatasource.getCurrentTrack(authToken)
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
