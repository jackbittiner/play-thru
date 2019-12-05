import { gql } from "apollo-boost";

export const GET_ROUTE = gql`
  query route($startTrackId: String!, $endTrackId: String!) {
    route(startTrackId: $startTrackId, endTrackId: $endTrackId) {
      camelotPosition
      mode
      name
      art
      uri
      artistName
      id
    }
  }
`;
