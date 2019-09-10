import React from 'react';
import styled from 'styled-components';

import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
      return (
        <RecommendationsByKey
          key={index}
          tracksByKey={tracksByKey}
          token={token}
        />
      );
    }
  );
}

function RecommendationsByKey({ token, tracksByKey }) {
  return (
    <div>
      <h3>{tracksByKey.key.name}</h3>
      {tracksByKey.recommendedTracks.map(track => (
        <RecommendedTrack track={track} token={token} />
      ))}
    </div>
  );
}

function RecommendedTrack({ track, token }) {
  const playerInput = { uris: [track.uri] };

  const CHANGE_TRACK = gql`
    query playTrack($playerInput: PlayerInput, $authToken: String!) {
      player(playerInput: $playerInput, authToken: $authToken) {
        playing
        start
      }
    }
  `;

  const [playNewTrack] = useLazyQuery(CHANGE_TRACK, {
    variables: { playerInput: playerInput, authToken: token }
  });

  return (
    <div key={track.id}>
      <ListItem>
        <button
          onClick={() => {
            playNewTrack();
          }}
        >
          {track.name} by {track.artist}
        </button>
      </ListItem>
    </div>
  );
}

const ListItem = styled.li`
  list-style: none;
  padding: 2px;
  margin: 2px;
`;
