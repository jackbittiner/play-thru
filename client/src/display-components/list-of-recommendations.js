import React from 'react';
import styled from 'styled-components';

import { Trail } from 'react-spring';

import { getKeyName } from '../camelot-wheel/camelot-wheel';

export default function ListsOfRecommendations({
  recommendedTracksByKey,
  handleClick
}) {
  return (
    Object.keys(recommendedTracksByKey).length > 0 &&
    Object.values(recommendedTracksByKey).map((tracks, index) => {
      return <RecommendationsByKey handleClick={handleClick} tracks={tracks} />;
    })
  );
}

function RecommendationsByKey({ tracks, handleClick }) {
  return (
    <div>
      <h3>{getKeyName(tracks[0].key, tracks[0].mode)}</h3>
      <Trail
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        keys={tracks.map(track => track.uri)}
      >
        {tracks.map(track => styles => (
          <div style={styles}>
            <listItem>
              <button onClick={() => handleClick(track.uri)}>
                {track.name} by {track.artists[0].name}
              </button>
            </listItem>
          </div>
        ))}
      </Trail>
    </div>
  );
}

const listItem = styled.li`
  list-style: none;
  padding: 2px;
  margin: 2px;
`;
