import React, { useState } from "react";
import SearchContainer from "./search/search-container";
import { useQuery } from "@apollo/react-hooks";
import { GET_ROUTE } from "./get-route";

const TrackRouterContainer = () => {
  const [initialTracks, setInitialTracks] = useState([]);

  const track1 = initialTracks && initialTracks[0];
  const track2 = initialTracks && initialTracks[1];

  const { data } = useQuery(GET_ROUTE, {
    variables: {
      startTrackId: track1 && track1.id,
      endTrackId: track2 && track2.id,
    },
    skip: initialTracks.length < 2,
  });

  const inbetweenTracks =
    data &&
    data.route.map((track, index) => {
      return (
        <p>
          {index + 1}. {track.name} by {track.artistName}{" "}
          <strong>
            CP: {track.camelotPosition} M: {track.mode} BPM: {track.tempo}
          </strong>
        </p>
      );
    });

  return (
    <div>
      <SearchContainer
        setInitialTracks={setInitialTracks}
        initialTracks={initialTracks}
      />
      {track1 && (
        <p>
          Start Track: {track1.name} by {track1.artist}
        </p>
      )}
      {inbetweenTracks}
      {track2 && (
        <p>
          End Track: {track2.name} by {track2.artist}
        </p>
      )}
    </div>
  );
};

export default TrackRouterContainer;
