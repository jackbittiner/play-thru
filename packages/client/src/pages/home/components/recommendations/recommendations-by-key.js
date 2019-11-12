import React from "react";
import Track from "../track";

function RecommendationsByKey({ tracksByKey, client }) {
  return (
    <div>
      <h3>{tracksByKey.key.name}</h3>
      {tracksByKey.recommendedTracks.map(track => (
        <Track
          track={track}
          key={track.uri}
          trackTypeGA={"Recommendation"}
          client={client}
        />
      ))}
    </div>
  );
}

export default RecommendationsByKey;
