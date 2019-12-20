import React from "react";
import styled from "styled-components";

import { useMutation } from "@apollo/react-hooks";
import { CHANGE_TRACK } from "./change-track";

import ReactGA from "react-ga";
import { GET_TRACK } from "../get-track";
import { GET_RECOMMENDATIONS } from "../recommendations/get-recommendations";

export default function Track({ track, deviceId, trackTypeGA, client }) {
  const [playNewTrack] = useMutation(CHANGE_TRACK, {
    variables: {
      trackUri: track.uri,
      deviceId: deviceId
    }
  });

  let interval;
  let count = 0;

  const prefetchNextTrack = () => {
    interval = setInterval(async () => {
      count++;
      if (count >= 4) {
        clearInterval(interval);
        const { data } = await client.query({
          query: GET_TRACK,
          variables: { trackId: track.id }
        });
        client.query({
          query: GET_RECOMMENDATIONS,
          variables: { currentTrack: data.currentTrack }
        });
      }
    }, 100);
  };

  const handleMouseLeave = () => {
    clearInterval(interval);
    count = 0;
  };

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
          onMouseOver={prefetchNextTrack}
          onMouseLeave={handleMouseLeave}
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
