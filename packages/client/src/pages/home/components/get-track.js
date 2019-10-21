import { gql } from "apollo-boost";

export const GET_TRACK = gql`
  query currentTrack($trackId: String!) {
    currentTrack(trackId: $trackId) {
      name
      art
      id
      popularity
      artist {
        id
        name
      }
      trackFeatures {
        key {
          name
          pitchClass
          mode
        }
        tempo
        time_signature
        harmonicKeys {
          name
          pitchClass
          mode
        }
      }
    }
  }
`;
