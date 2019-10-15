import React, { useState } from "react";
import Search from "./search";
import LoadingIndicator from "../loading-indicator";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";

import styled from "styled-components";

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

const SearchContainer = ({ authToken, deviceId }) => {
  const [getSearchResults, { loading, error, data }] = useLazyQuery(
    SEARCH_QUERY
  );

  const [searchBarText, setSearchBarText] = useState("");

  if (loading)
    return (
      <Page>
        <LoadingIndicator />
      </Page>
    );
  if (error) return <p>Error ---- Search Container</p>;

  return (
    <Search
      getSearchResults={getSearchResults}
      data={data}
      authToken={authToken}
      deviceId={deviceId}
      searchBarText={searchBarText}
      setSearchBarText={setSearchBarText}
    />
  );
};

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export default SearchContainer;
