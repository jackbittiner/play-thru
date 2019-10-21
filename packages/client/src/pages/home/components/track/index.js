import React from "react";
import styled from "styled-components";

import { useMutation } from "@apollo/react-hooks";
import { CHANGE_TRACK } from "./change-track";

export default function Track({
  track,
  deviceId,
  addTrackToSetlistState,
  setlistState
}) {
  const [playNewTrack] = useMutation(CHANGE_TRACK, {
    variables: {
      trackUri: track.uri,
      deviceId: deviceId
    }
  });

  return (
    <div key={track.id}>
      <ListItem>
        <button
          onClick={() => {
            addTrackToSetlistState(setlistState.concat(track));
            playNewTrack();
          }}
        >
          {track.name} by {track.artist}
        </button>
      </ListItem>
    </div>
  );
}

const ListItem = styled.li`
  list-style: none;
  padding: 2px;
  margin: 2px;
`;
