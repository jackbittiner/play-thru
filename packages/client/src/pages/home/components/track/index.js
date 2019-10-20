import React from "react";
import styled from "styled-components";

import { useLazyQuery } from "@apollo/react-hooks";
import { CHANGE_TRACK } from "./change-track";

export default function Track({ track, deviceId }) {
  const playerInput = { uris: [track.uri] };

  const [playNewTrack] = useLazyQuery(CHANGE_TRACK, {
    variables: {
      playerInput: playerInput,
      device: deviceId
    }
  });

  return (
    <div key={track.id}>
      <ListItem>
        <button
          onClick={() => {
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
