import React from "react";
import styled from "styled-components";

import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export default function Track({ track, deviceId }) {
  const playerInput = { uris: [track.uri] };
  const CHANGE_TRACK = gql`
    query playTrack($playerInput: PlayerInput, $device: String) {
      player(playerInput: $playerInput, device: $device) {
        playing
        start
      }
    }
  `;

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
