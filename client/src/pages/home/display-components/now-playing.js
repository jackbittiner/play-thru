import React from "react";

export default function NowPlaying({ currentTrack }) {
  if (currentTrack)
    return (
      <div>
        <h2>
          {currentTrack.name} by {currentTrack.artist.name}
        </h2>
        {currentTrack.trackFeatures && (
          <React.Fragment>
            <p>
              Key - {currentTrack.trackFeatures.key} tempo ={" "}
              {currentTrack.trackFeatures.tempo} time signature ={" "}
              {currentTrack.trackFeatures.time_signature}
            </p>
          </React.Fragment>
        )}
        <img
          src={currentTrack.art}
          style={{ height: 150 }}
          alt={currentTrack.artist.artistName}
        />
      </div>
    );
  return null;
}
