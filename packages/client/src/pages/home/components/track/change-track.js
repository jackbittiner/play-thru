import { gql } from "apollo-boost";

export const CHANGE_TRACK = gql`
  mutation playTrack($trackUri: String, $deviceId: String) {
    playTrack(trackUri: $trackUri, deviceId: $deviceId) {
      status
      trackUri
      deviceId
    }
  }
`;
