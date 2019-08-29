import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    currentTrack(authToken: String!): CurrentTrack
    recommendedTracksByKey(
      authToken: String!
      currentTrack: CurrentTrackInput!
    ): [RecommendedTracksByKey]
    player(authToken: String!, playerInput: PlayerInput): Player
    devices(authToken: String!): [Device]
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

  type Device {
    id: String!
    is_active: Boolean
    is_private_session: Boolean
    is_restricted: Boolean
    name: String
    type: String
    volume_percent: Int
  }
`;

export default typeDefs;
