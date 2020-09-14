import React from "react";
import Track from "../track";
import { RecommendedTracksByKey } from "../../../../common/spotify-types";
import { ApolloClient } from "apollo-boost";

type RecommendationsByKeyProps = {
  tracksByKey: RecommendedTracksByKey;
  client: ApolloClient<any>;
};

function RecommendationsByKey({
  tracksByKey,
  client,
}: RecommendationsByKeyProps) {
  return (
    <div>
      <h3>{tracksByKey.key.name}</h3>
      {tracksByKey.recommendedTracks.map((track) => (
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
