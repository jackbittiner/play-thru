import React from "react";

import { RecommendedTrack } from "./list-of-recommendations";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_TOP_TRACKS = gql`
  query getTracks($authToken: String!) {
    favourites(authToken: $authToken) {
      tracks {
        id
        name
        uri
        artist
      }
    }
  }
`;

export default function TopTracks({ token, currentDevice }) {
  const { loading, error, data } = useQuery(GET_TOP_TRACKS, {
    variables: { authToken: token }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ---- Top Tracks</p>;

  const tracks = data && data.favourites.tracks;
  if (tracks)
    return tracks.map(track => (
      <RecommendedTrack
        track={track}
        token={token}
        currentDevice={currentDevice}
        key={track.id}
      />
    ));
}
