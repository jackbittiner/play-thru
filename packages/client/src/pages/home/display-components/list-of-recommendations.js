import React from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_RECOMMENDATIONS = gql`
  query recommendedTracksByKey(
    $authToken: String!
    $currentTrack: CurrentTrackInput!
  ) {
    recommendedTracksByKey(authToken: $authToken, currentTrack: $currentTrack) {
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
      }
    }
  }
`;

export default function ListsOfRecommendations({ token, currentTrack }) {
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS, {
    variables: { authToken: token, currentTrack: currentTrack }
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
        <div key={track.id}>
          <ListItem>
            <button onClick={() => console.log(track.uri)}>
              {track.name} by {track.artist}
            </button>
          </ListItem>
        </div>
      ))}
    </div>
  );
}

const ListItem = styled.li`
  list-style: none;
  padding: 2px;
  margin: 2px;
`;
