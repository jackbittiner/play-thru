import React, { useState } from "react";
import Search from "./search";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";

const SEARCH_QUERY = gql`
  query search($query: String!) {
    searchResults(query: $query) {
      artist
      id
      name
      uri
      art
    }
  }
`;

const SearchContainer = ({ deviceId, changeTrack, setlist }) => {
  const [getSearchResults, { loading, error, data }] = useLazyQuery(
    SEARCH_QUERY
  );

  const [searchBarText, setSearchBarText] = useState("");

  if (error) return <p>Error ---- Search Container</p>;

  return (
    <Search
      loading={loading}
      getSearchResults={getSearchResults}
      data={data}
      deviceId={deviceId}
      searchBarText={searchBarText}
      setSearchBarText={setSearchBarText}
      changeTrack={changeTrack}
      setlist={setlist}
    />
  );
};

export default SearchContainer;
