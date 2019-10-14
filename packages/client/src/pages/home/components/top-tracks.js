import React from "react";

import { RecommendedTrack } from "./list-of-recommendations";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";
import styled from "styled-components";

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

export default function TopTracks({ token, deviceId }) {
  const { loading, error, data } = useQuery(GET_TOP_TRACKS, {
    variables: { authToken: token }
  });
  if (loading)
    return (
      <Page>
        <ScaleLoader
          css={cssOverride}
          sizeUnit={"px"}
          height={50}
          width={10}
          radius={5}
          color={"#57E5DE"}
        />
      </Page>
    );
  if (error) return <p>Error ---- Top Tracks</p>;

  const tracks = data && data.favourites.tracks;
  if (tracks)
    return tracks.map(track => (
      <RecommendedTrack
        track={track}
        token={token}
        deviceId={deviceId}
        key={track.id}
      />
    ));
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const cssOverride = css`
  display: block;
  margin: auto;
`;
