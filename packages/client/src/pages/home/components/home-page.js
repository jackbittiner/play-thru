import React from "react";

import styled from "styled-components";

import NowPlaying from "./now-playing";
import ListsOfRecommendations from "./recommendations/list-of-recommendations";

import SearchContainer from "./search/search-container";
import Setlist from "./setlist";

import TopTracks from "./top-tracks";
import isEmpty from "lodash/isEmpty";

function HomePage({ data, deviceId, paused, userId }) {
  return (
    <Page>
      <p>{userId}</p>
      {isEmpty(data) && paused && (
        <FirstSongSection>
          <Search>
            <h3>Search for a song to start your set</h3>
            <SearchContainer deviceId={deviceId} />
          </Search>
          <Favourites>
            <h3>Or play one of your classics</h3>
            <TopTracks deviceId={deviceId} />
          </Favourites>
        </FirstSongSection>
      )}
      {!isEmpty(data) && (
        <React.Fragment>
          <CurrentTrack>
            {data && <NowPlaying currentTrack={data.currentTrack} />}
          </CurrentTrack>
          <Recommendations>
            {data && (
              <ListsOfRecommendations currentTrack={data.currentTrack} />
            )}
          </Recommendations>
          <Setlist currentTrack={data.currentTrack} userId={userId} />
        </React.Fragment>
      )}
    </Page>
  );
}

export default HomePage;

const Page = styled.div`
  display: grid;
  text-align: center;
  height: 100%;
`;

const FirstSongSection = styled.div`
  display: grid;
`;

const Search = styled.div`
  display: grid;
`;

const Favourites = styled.div`
  display: grid;
`;

const CurrentTrack = styled.div``;

const Recommendations = styled.div`
  display: grid;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
