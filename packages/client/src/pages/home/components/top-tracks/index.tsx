import React from "react";

import Track from "../track";

import { useQuery } from "@apollo/react-hooks";
import { GET_TOP_TRACKS } from "./get-top-tracks";

import LoadingIndicator from "../loading-indicator";
import styled from "styled-components";
import { Track as SpotifyTrack } from "../../../../common/spotify-types";

type TopTracks = {
  deviceId: string;
};

export default function TopTracks({ deviceId }: TopTracks) {
  const { loading, error, data, client } = useQuery(GET_TOP_TRACKS);
  if (loading)
    return (
      <Page>
        <LoadingIndicator />
      </Page>
    );
  if (error) return <p>Error ---- Top Tracks</p>;

  const tracks = data && data.favourites;
  if (tracks)
    return tracks.map((track: SpotifyTrack) => (
      <Track
        track={track}
        deviceId={deviceId}
        key={track.id}
        trackTypeGA={"Favourites"}
        client={client}
      />
    ));
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
