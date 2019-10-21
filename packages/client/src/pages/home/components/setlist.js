import React from "react";

const Setlist = ({ setlist }) => {
  const tracks = setlist.map(track => {
    return <p>{track.name}</p>;
  });
  return tracks;
};

export default Setlist;
