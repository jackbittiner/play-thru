import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_PLAYLIST_OF_TRACKS } from "./create-playlist-of-tracks";

import { getSetlist } from "./get-setlist";

import ReactGA from "react-ga";
import { CurrentTrack, Track } from "../../../../common/spotify-types";

type SetlistProps = {
  currentTrack: CurrentTrack;
  userId: string;
};

const Setlist = ({ currentTrack, userId }: SetlistProps) => {
  const [setlist, setSetlist] = useState([]);
  useEffect(() => {
    setSetlist(getSetlist(currentTrack));
  }, [currentTrack]);

  const trackUris = setlist.map((track: Track) => {
    return track.uri;
  });

  const [createPlaylist] = useMutation(CREATE_PLAYLIST_OF_TRACKS, {
    variables: {
      trackUris: trackUris,
      userId: userId,
    },
  });

  const tracks = setlist.map((track: Track) => {
    return <div key={track.id}>{track.name}</div>;
  });
  return (
    <div>
      <h3>Setlist</h3>
      {tracks}
      <button
        onClick={() => {
          ReactGA.event({
            category: "Setlist",
            action: "Convert to Playlist",
            label: `${setlist.length} songs`,
          });
          createPlaylist();
        }}
      >
        Make Playlist
      </button>
    </div>
  );
};

export default Setlist;
