import { gql } from "apollo-boost";

export const GET_TOP_TRACKS = gql`
  query getTracks {
    favourites {
      id
      name
      uri
      artist
      art
    }
  }
`;
