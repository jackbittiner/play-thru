import { gql } from "apollo-boost";

export const CHANGE_TRACK = gql`
  query playTrack($playerInput: PlayerInput, $device: String) {
    player(playerInput: $playerInput, device: $device) {
      playing
      start
    }
  }
`;
