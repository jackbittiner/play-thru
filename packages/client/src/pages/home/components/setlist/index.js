import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_PLAYLIST_OF_TRACKS } from "./create-playlist-of-tracks";

import { getSetlist } from "./get-setlist";

const Setlist = ({ currentTrack }) => {
  const [setlist, setSetlist] = useState([]);

  useEffect(() => {
    setSetlist(getSetlist(currentTrack));
  }, [currentTrack]);

  const trackUris = setlist.map(track => {
    return track.uri;
  });

  const [createPlaylist] = useMutation(CREATE_PLAYLIST_OF_TRACKS, {
    variables: {
      trackUris: trackUris
    }
  });

  const tracks = setlist.map(track => {
    return <div key={track.id}>{track.name}</div>;
  });
  return (
    <div>
      <h3>Setlist</h3>
      {tracks}
      <button onClick={() => createPlaylist()}>Make Playlist</button>
    </div>
  );
};

export default Setlist;
