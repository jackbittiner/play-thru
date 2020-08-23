import React, { useState } from "react";
import Search from "./search";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";

type SearchContainerProps = {
  deviceId: string;
};

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

const SearchContainer = ({ deviceId }: SearchContainerProps) => {
  const [getSearchResults, { loading, error, data, client }] = useLazyQuery(
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
      client={client}
    />
  );
};

export default SearchContainer;
