import React from "react";

import { RecommendedTrack } from "./list-of-recommendations";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import LoadingIndicator from "./loading-indicator";
import styled from "styled-components";

const GET_TOP_TRACKS = gql`
  query getTracks($authToken: String!) {
    favourites(authToken: $authToken) {
      tracks {
        id
        name
        uri
        artist
        art
      }
    }
  }
`;

export default function TopTracks({ token, deviceId }) {
  const authToken = sessionStorage.getItem("accessToken");
  const { loading, error, data } = useQuery(GET_TOP_TRACKS, {
    variables: { authToken: authToken }
  });
  if (loading)
    return (
      <Page>
        <LoadingIndicator />
      </Page>
    );
  if (error) return <p>Error ---- Top Tracks</p>;

  const tracks = data && data.favourites.tracks;
  if (tracks)
    return tracks.map(track => (
      <RecommendedTrack track={track} deviceId={deviceId} key={track.id} />
    ));
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
