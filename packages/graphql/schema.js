import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    currentTrack(authToken: String!): CurrentTrack
    recommendedTracksByKey(
      authToken: String!
      currentTrack: CurrentTrackInput!
    ): [RecommendedTracksByKey]
  }

  type CurrentTrack {
    name: String!
    art: String
    id: String!
    artist: Artist!
    popularity: Float!
    trackFeatures(authToken: String!): TrackFeatures!
  }

  input CurrentTrackInput {
    name: String!
    art: String
    id: String!
    artist: ArtistInput!
    popularity: Float!
    trackFeatures: TrackFeaturesInput!
  }

  type Artist {
    id: String!
    name: String!
  }

  input ArtistInput {
    id: String!
    name: String!
  }

  type TrackFeatures {
    key: Key!
    tempo: Float!
    time_signature: Int!
    harmonicKeys: [Key]!
    danceability: Float!
    energy: Float!
    valence: Float!
  }

  input TrackFeaturesInput {
    key: KeyInput!
    tempo: Float!
    time_signature: Int!
    harmonicKeys: [KeyInput]!
    danceability: Float!
    energy: Float!
    valence: Float!
  }

  type Key {
    name: String!
    pitchClass: Int!
    mode: Int!
  }

  input KeyInput {
    name: String!
    pitchClass: Int!
    mode: Int!
  }

  type RecommendedTracksByKey {
    key: Key!
    recommendedTracks: [RecommendedTrack]!
  }

  type RecommendedTrack {
    artist: String!
    id: String!
    name: String!
    uri: String!
  }
`;

export default typeDefs;
