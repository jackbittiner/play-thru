import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    currentTrack(trackId: String!): CurrentTrack!
    recommendedTracksByKey(
      currentTrack: CurrentTrackInput!
    ): [RecommendedTracksByKey]
    favourites: [Track]!
    searchResults(query: String!): [Track]!
    account: Account!
    route(startTrackId: String!, endTrackId: String!): [OnRouteTracks]
  }

  type Mutation {
    playTrack(trackUri: String, deviceId: String): PlayTrackObject!
    createPlaylistOfTracks(trackUris: [String], userId: String!): Boolean
  }

  type CurrentTrack {
    name: String!
    art: String
    id: String!
    uri: String!
    artist: Artist!
    popularity: Float!
    trackFeatures: TrackFeatures!
  }

  type OnRouteTracks {
    name: String!
    art: String!
    id: String!
    uri: String!
    artistName: String!
    camelotPosition: Int!
    mode: Int!
    tempo: Float!
  }

  input CurrentTrackInput {
    name: String!
    art: String
    id: String!
    artist: ArtistInput!
    popularity: Float!
    trackFeatures: TrackFeaturesInput!
    uri: String!
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
  }

  input TrackFeaturesInput {
    key: KeyInput!
    tempo: Float!
    time_signature: Int!
    harmonicKeys: [KeyInput]!
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
    recommendedTracks: [Track]!
  }

  type Track {
    artist: String!
    id: String!
    name: String!
    uri: String!
    art: String
  }

  type PlayTrackObject {
    status: String
    trackUri: String
    deviceId: String
  }

  type Account {
    id: String!
    isPremium: Boolean!
  }
`;

export default typeDefs;
