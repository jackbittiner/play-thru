import React, { useState } from "react";

import styled from "styled-components";

import NowPlaying from "./now-playing";
import ListsOfRecommendations from "./list-of-recommendations";
import TopTracks from "./top-tracks";
import isEmpty from "lodash/isEmpty";

function HomePage({ data, token, refetch, deviceId }) {
  return (
    <Page>
      {isEmpty(data) && (
        <React.Fragment>
          <TopTracks token={token} deviceId={deviceId} />
        </React.Fragment>
      )}
      {token && !isEmpty(data) && (
        <React.Fragment>
          <CurrentTrack>
            {data && <NowPlaying currentTrack={data.track} />}
            <button onClick={() => refetch()}>Check Now Playing</button>
          </CurrentTrack>
          {data && (
            <ListsOfRecommendations token={token} currentTrack={data.track} />
          )}
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
}
`;

const CurrentTrack = styled.div`
  grid-area: CurrentTrack;
`;
