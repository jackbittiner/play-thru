import React from "react";
import Track from "../track";

function RecommendationsByKey({
  tracksByKey,
  addTrackToSetlistState,
  setlistState
}) {
  return (
    <div>
      <h3>{tracksByKey.key.name}</h3>
      {tracksByKey.recommendedTracks.map(track => (
        <Track
          track={track}
          key={track.uri}
          addTrackToSetlistState={addTrackToSetlistState}
          setlistState={setlistState}
        />
      ))}
    </div>
  );
}

export default RecommendationsByKey;
