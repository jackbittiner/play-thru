import React from "react";
import Track from "../track";

function RecommendationsByKey({ tracksByKey }) {
  return (
    <div>
      <h3>{tracksByKey.key.name}</h3>
      {tracksByKey.recommendedTracks.map(track => (
        <Track track={track} key={track.uri} />
      ))}
    </div>
  );
}

export default RecommendationsByKey;
