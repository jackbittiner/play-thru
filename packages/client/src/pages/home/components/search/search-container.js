import React, { useState } from "react";
import Search from "./search";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";

const SEARCH_QUERY = gql`
  query search($authToken: String!, $query: String!) {
    searchResults(authToken: $authToken, query: $query) {
      artist
      id
      name
      uri
      art
    }
  }
`;

const SearchContainer = ({ deviceId }) => {
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
    />
  );
};

export default SearchContainer;
