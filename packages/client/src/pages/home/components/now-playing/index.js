import React from "react";
import styled from "styled-components";

export default function NowPlaying({ currentTrack }) {
  if (currentTrack)
    return (
      <CurrentTrack>
        <Image src={currentTrack.art} alt={currentTrack.artist.artistName} />
        <TrackName>{currentTrack.name}</TrackName>
        <ArtistName>{currentTrack.artist.name}</ArtistName>
      </CurrentTrack>
    );
  return null;
}

const CurrentTrack = styled.div``;

const Image = styled.img`
  height: 150px;
  margin-top: 2em;
  border-radius: 10px;
`;

const TrackName = styled.h2`
  margin: 0.5em;
`;

const ArtistName = styled.h3`
  margin: 0.5em;
`;
