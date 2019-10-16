import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    currentTrack(authToken: String!, trackId: String!): CurrentTrack!
    recommendedTracksByKey(
      authToken: String!
      currentTrack: CurrentTrackInput!
    ): [RecommendedTracksByKey]
    player(authToken: String!, playerInput: PlayerInput, device: String): Player
    favourites(authToken: String!): Favourites
    searchResults(authToken: String!, query: String!): [Track]!
  }

  type Favourites {
    artists: [Artist]!
    tracks: [Track]!
  }

  type CurrentTrack {
    name: String!
    art: String
    id: String!
    uri: String!
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
    art: String!
  }

  input PlayerInput {
    uris: [String]
    offset: OffsetInput
    position_ms: Int
  }

  input OffsetInput {
    position: Int
  }

  type Player {
    playing: [String]
    start: String
  }
`;

export default typeDefs;
