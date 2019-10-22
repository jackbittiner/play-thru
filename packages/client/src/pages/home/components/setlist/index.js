import React from "react";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_PLAYLIST_OF_TRACKS } from "./create-playlist-of-tracks";

const Setlist = ({ setlist }) => {
  const trackUris = setlist.map(track => {
    return track.uri;
  });

  const [createPlaylist] = useMutation(CREATE_PLAYLIST_OF_TRACKS, {
    variables: {
      trackUris: trackUris
    }
  });

  const tracks = setlist.map(track => {
    return <p>{track.name}</p>;
  });
  return (
    <div>
      {tracks}
      <button onClick={() => createPlaylist()}>Make Playlist</button>
    </div>
  );
};

export default Setlist;
