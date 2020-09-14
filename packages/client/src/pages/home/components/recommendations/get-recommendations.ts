import { gql } from "apollo-boost";

export const GET_RECOMMENDATIONS = gql`
  query recommendedTracksByKey($currentTrack: CurrentTrackInput!) {
    recommendedTracksByKey(currentTrack: $currentTrack) {
      key {
        name
        pitchClass
        mode
      }
      recommendedTracks {
        artist
        id
        name
        uri
        art
      }
    }
  }
`;
