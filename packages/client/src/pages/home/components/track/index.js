import React from "react";
import styled from "styled-components";

export default function Track({ track, deviceId, changeTrack, setlist }) {
  return (
    <div key={track.id}>
      <ListItem>
        <button
          onClick={() => {
            changeTrack({
              variables: {
                track: track,
                deviceId: deviceId,
                setlist: setlist
              }
            });
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
