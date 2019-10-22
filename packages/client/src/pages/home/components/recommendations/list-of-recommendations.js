import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_RECOMMENDATIONS } from "./get-recommendations";

import RecommendationsByKey from "./recommendations-by-key";

export default function ListsOfRecommendations({
  currentTrack,
  changeTrack,
  setlist
}) {
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS, {
    variables: { currentTrack: currentTrack }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return Object.values(data.recommendedTracksByKey).map(
    (tracksByKey, index) => {
      return (
        <RecommendationsByKey
          key={index}
          tracksByKey={tracksByKey}
          changeTrack={changeTrack}
          setlist={setlist}
        />
      );
    }
  );
}
