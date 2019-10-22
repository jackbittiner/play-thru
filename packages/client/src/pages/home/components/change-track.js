import { gql } from "apollo-boost";

export const CHANGE_TRACK = gql`
  mutation playTrack(
    $track: TrackInput
    $deviceId: String
    $setlist: [TrackInput]
  ) {
    playTrack(track: $track, deviceId: $deviceId, setlist: $setlist) {
      status
      track {
        artist
        id
        name
        uri
        art
      }
      deviceId
      setlist {
        artist
        id
        name
        uri
        art
      }
    }
  }
`;
