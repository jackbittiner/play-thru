import React from "react";
import styled from "styled-components";

import { useMutation } from "@apollo/react-hooks";
import { CHANGE_TRACK } from "./change-track";

import ReactGA from "react-ga";

export default function Track({ track, deviceId, trackTypeGA }) {
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
            ReactGA.event({
              category: "Play Track",
              action: trackTypeGA,
              label: `Track: ${track.id}`
            });
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
