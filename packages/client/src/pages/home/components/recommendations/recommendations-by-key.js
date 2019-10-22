import React from "react";
import Track from "../track";

function RecommendationsByKey({ tracksByKey, changeTrack, setlist }) {
  return (
    <div>
      <h3>{tracksByKey.key.name}</h3>
      {tracksByKey.recommendedTracks.map(track => (
        <Track
          track={track}
          key={track.uri}
          changeTrack={changeTrack}
          setlist={setlist}
        />
      ))}
    </div>
  );
}

export default RecommendationsByKey;
