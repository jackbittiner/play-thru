import React from "react";

import Track from "../track";

import { useQuery } from "@apollo/react-hooks";
import { GET_TOP_TRACKS } from "./get-top-tracks";

import LoadingIndicator from "../loading-indicator";
import styled from "styled-components";

export default function TopTracks({ deviceId, changeTrack, setlist }) {
  const { loading, error, data } = useQuery(GET_TOP_TRACKS);
  if (loading)
    return (
      <Page>
        <LoadingIndicator />
      </Page>
    );
  if (error) return <p>Error ---- Top Tracks</p>;

  const tracks = data && data.favourites;
  if (tracks)
    return tracks.map(track => (
      <Track
        track={track}
        deviceId={deviceId}
        key={track.id}
        changeTrack={changeTrack}
        setlist={setlist}
      />
    ));
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
