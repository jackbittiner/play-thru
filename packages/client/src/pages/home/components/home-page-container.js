import React from "react";
import getHashParams from "./utils/get-hash-params";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_CURRENT_TRACK = gql`
  query currentTrack($authToken: String!) {
    currentTrack(authToken: $authToken) {
      name
      art
      id
      popularity
      artist {
        id
        name
      }
      trackFeatures(authToken: $authToken) {
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
        danceability
        energy
        valence
      }
    }
  }
`;

function HomePageContainer() {
  const params = getHashParams();
  const token = params.access_token;

  const { _loading, _error, data, refetch } = useQuery(GET_CURRENT_TRACK, {
    variables: { authToken: token }
  });

  return <HomePage data={data} refetch={refetch} token={token} />;
}

export default HomePageContainer;
