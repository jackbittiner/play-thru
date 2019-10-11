import React, { useState } from "react";

import styled from "styled-components";

import NowPlaying from "./now-playing";
import ListsOfRecommendations from "./list-of-recommendations";
import TopTracks from "./top-tracks";
import isEmpty from "lodash/isEmpty";

function HomePage({ data, token, deviceId }) {
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
          </CurrentTrack>
          <Recommendations>
            {data && (
              <ListsOfRecommendations token={token} currentTrack={data.track} />
            )}
          </Recommendations>
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
