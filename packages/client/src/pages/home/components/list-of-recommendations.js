import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Track from "./track";

const GET_RECOMMENDATIONS = gql`
  query recommendedTracksByKey($currentTrack: CurrentTrackInput!) {
    recommendedTracksByKey(currentTrack: $currentTrack) {
      key {
        name
        pitchClass
        mode
      }
      recommendedTracks {
        artist
        id
        name
        uri
        art
      }
    }
  }
`;

export default function ListsOfRecommendations({ currentTrack }) {
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS, {
    variables: { currentTrack: currentTrack }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return Object.values(data.recommendedTracksByKey).map(
    (tracksByKey, index) => {
      return <RecommendationsByKey key={index} tracksByKey={tracksByKey} />;
    }
  );
}

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
