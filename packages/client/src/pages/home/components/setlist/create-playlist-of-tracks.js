import { gql } from "apollo-boost";

export const CREATE_PLAYLIST_OF_TRACKS = gql`
  mutation createPlaylistOfTracks($trackUris: [String], $userId: String!) {
    createPlaylistOfTrakcs(trackUris: $trackUris, userId: $userId)
  }
`;
