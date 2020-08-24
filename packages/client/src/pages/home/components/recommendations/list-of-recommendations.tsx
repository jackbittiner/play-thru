import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_RECOMMENDATIONS } from "./get-recommendations";

import RecommendationsByKey from "./recommendations-by-key";
import {
  CurrentTrack,
  RecommendedTracksByKey,
} from "../../../../common/spotify-types";

type ListsOfRecommendationsProps = {
  currentTrack: CurrentTrack;
};

export default function ListsOfRecommendations({
  currentTrack,
}: ListsOfRecommendationsProps) {
  const { loading, error, data, client } = useQuery(GET_RECOMMENDATIONS, {
    variables: { currentTrack: currentTrack },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return Object.values(data.recommendedTracksByKey).map(
    (tracksByKey, index) => {
      return (
        <RecommendationsByKey
          key={index}
          tracksByKey={tracksByKey as RecommendedTracksByKey}
          client={client}
        />
      );
    }
  );
}
