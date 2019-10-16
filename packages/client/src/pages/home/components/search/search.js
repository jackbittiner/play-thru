import React, { useEffect } from "react";
import { debounce } from "lodash";
import { RecommendedTrack } from "../list-of-recommendations";

import styled from "styled-components";

const Search = ({
  getSearchResults,
  data,
  deviceId,
  searchBarText,
  setSearchBarText
}) => {
  const authToken = sessionStorage.getItem("accessToken");
  const debouncedInputHandler = debounce(e => {
    setSearchBarText(e.target.value);
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
      <RecommendedTrack track={track} deviceId={deviceId} key={track.id} />
    ));

  return (
    <>
      <StyledInput
        autoFocus
        onChange={e => {
          e.persist();
          debouncedInputHandler(e);
        }}
        type="text"
        placeholder="Pick a bangin' song to start your set..."
        defaultValue={searchBarText}
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
