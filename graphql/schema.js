import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    currentTrack(authToken: String!): CurrentTrack
  }

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
`;

export default typeDefs;
