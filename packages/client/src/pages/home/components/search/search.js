import React from "react";
import { debounce } from "lodash";
import { RecommendedTrack } from "../list-of-recommendations";

import styled from "styled-components";

const Search = ({ getSearchResults, data, authToken, deviceId }) => {
  const debouncedInputHandler = debounce(e => {
    getSearchResults({
      variables: {
        authToken: authToken,
        query: e.target.value
      }
    });
  }, 1000);

  const tracks =
    data &&
    data.searchResults.map(track => (
      <RecommendedTrack
        track={track}
        token={authToken}
        deviceId={deviceId}
        key={track.id}
      />
    ));

  return (
    <>
      <StyledInput
        onChange={e => {
          e.persist();
          debouncedInputHandler(e);
        }}
        type="text"
        placeholder="Pick a bangin' song to start your set..."
      />
      {tracks}
    </>
  );
};

const StyledInput = styled.input`
  width: 80%;
  margin: auto;
`;

export default Search;
