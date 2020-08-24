import React from "react";
import styled from "styled-components";
import { CurrentTrack as SpotifyCurrentTrack } from "../../../../common/spotify-types";

type NowPlayingProps = {
  currentTrack: SpotifyCurrentTrack;
};

export default function NowPlaying({ currentTrack }: NowPlayingProps) {
  if (currentTrack)
    return (
      <CurrentTrack>
        <Image
          src={currentTrack.art}
          alt={`${currentTrack.name} - ${currentTrack.artist.name}`}
        />
        <TrackName>{currentTrack.name}</TrackName>
        <ArtistName>{currentTrack.artist.name}</ArtistName>
        <p>Key: {currentTrack.trackFeatures.key.name}</p>
        <p>Tempo: {Math.round(currentTrack.trackFeatures.tempo)}</p>
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
