import React from 'react';
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
      {tracks.map(track => {
        return (
          <li>
            <button onClick={() => handleClick(track.uri)}>
              {track.name} by {track.artists[0].name}
            </button>
          </li>
        );
      })}
    </div>
  );
}
