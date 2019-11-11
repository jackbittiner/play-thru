import { gql } from "apollo-boost";

export const GET_CURRENT_USER = gql`
  query account {
    account {
      id
      isPremium
    }
  }
`;
