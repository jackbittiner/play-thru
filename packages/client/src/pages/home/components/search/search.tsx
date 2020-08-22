import React from "react";
import { debounce } from "lodash";
import { Track as SpotifyTrack } from "../../../../common/spotify-types";
import Track from "../track";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import colours from "../../../../common/colours";

// TODO - Replace any with real types
type SearchProps = {
  getSearchResults: any;
  data: any;
  loading: any;
  deviceId: any;
  searchBarText: any;
  setSearchBarText: any;
  client: any;
};

const Search = ({
  getSearchResults,
  data,
  loading,
  deviceId,
  searchBarText,
  setSearchBarText,
  client,
}: SearchProps) => {
  const debouncedInputHandler = debounce((e) => {
    const inputText = e.target.value;
    setSearchBarText(e.target.value);

    if (!inputText) return;
    getSearchResults({
      variables: {
        query: inputText,
      },
    });
  }, 1000);

  const tracks =
    data &&
    data.searchResults &&
    data.searchResults.map((track: SpotifyTrack) => (
      <Track
        track={track}
        deviceId={deviceId}
        key={track.id}
        trackTypeGA={"Search"}
        client={client}
      />
    ));

  const noResults = tracks && tracks.length === 0;

  return (
    <>
      <SearchBarWrapper>
        <SearchIcon />
        <StyledInput
          autoFocus
          onChange={(e) => {
            e.persist();
            debouncedInputHandler(e);
          }}
          type="text"
          placeholder="Pick a bangin' song to start your set..."
          defaultValue={searchBarText}
        />
        {loading && <ClipLoader css={cssOverride} />}
      </SearchBarWrapper>
      {tracks}
      {noResults && <p>No tracks found...</p>}
    </>
  );
};

const iconSize = "18px";
const cssOverride = css`
  position: absolute;
  height: ${iconSize};
  width: ${iconSize};
  right: 10px;
  top: 6px;
`;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 80%;
  align-self: center;
  justify-self: center;
`;

const StyledInput = styled.input`
  outline: none;
  border: 1px solid gray;
  width: 100%;
  margin: auto;
  height: 30px;
  text-indent: 45px;
  border-radius: 30px;
  font-size: 16px;
  :focus {
    outline: none;
    border-color: ${colours.malachite};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  color: gray;
  left: 10px;
  top: 8px;
  height: ${iconSize};
  width: ${iconSize};
`;

export default Search;
