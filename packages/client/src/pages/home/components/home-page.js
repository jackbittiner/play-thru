import React from "react";

import styled from "styled-components";

import NowPlaying from "./now-playing";
import ListsOfRecommendations from "./recommendations/list-of-recommendations";

import SearchContainer from "./search/search-container";
import Setlist from "./setlist";

import TopTracks from "./top-tracks";
import isEmpty from "lodash/isEmpty";

import { useMutation } from "@apollo/react-hooks";

import { CHANGE_TRACK } from "./change-track";

function HomePage({ currentTrack, deviceId, paused }) {
  const [changeTrack, { data }] = useMutation(CHANGE_TRACK);

  const setlist = (data && data.playTrack && data.playTrack.setlist) || [];

  console.log(data);

  return (
    <Page>
      {isEmpty(currentTrack) && paused && (
        <FirstSongSection>
          <Search>
            <h3>Search for a song to start your set</h3>
            <SearchContainer
              deviceId={deviceId}
              changeTrack={changeTrack}
              setlist={setlist}
            />
          </Search>
          <Favourites>
            <h3>Or play one of your classics</h3>
            <TopTracks
              deviceId={deviceId}
              changeTrack={changeTrack}
              setlist={setlist}
            />
          </Favourites>
        </FirstSongSection>
      )}
      {!isEmpty(currentTrack) && (
        <React.Fragment>
          <CurrentTrack>
            {currentTrack && (
              <NowPlaying currentTrack={currentTrack} setlist={setlist} />
            )}
          </CurrentTrack>
          <Recommendations>
            {currentTrack && (
              <ListsOfRecommendations
                currentTrack={currentTrack}
                changeTrack={changeTrack}
                setlist={setlist}
              />
            )}
          </Recommendations>
          <h3>Setlist</h3>
          <Setlist setlist={setlist} />
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
