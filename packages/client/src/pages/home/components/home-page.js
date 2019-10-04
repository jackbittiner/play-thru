import React, { useState } from "react";

import styled from "styled-components";

import NowPlaying from "./components/now-playing";
import ListsOfRecommendations from "./components/list-of-recommendations";
import TopTracks from "./components/top-tracks";
import isEmpty from "lodash/isEmpty";
import DeviceSelector from "./components/device-selector";

function HomePage({ data, token, refetch }) {
  const [currentDevice, setCurrentDevice] = useState();

  return (
    <Page>
      {isEmpty(data) && (
        <React.Fragment>
          <DeviceSelector token={token} setCurrentDevice={setCurrentDevice} />
          <TopTracks token={token} currentDevice={currentDevice} />
        </React.Fragment>
      )}
      {token && !isEmpty(data) && (
        <React.Fragment>
          <CurrentTrack>
            {data && <NowPlaying currentTrack={data.currentTrack} />}
            <button onClick={() => refetch()}>Check Now Playing</button>
          </CurrentTrack>
          {data && (
            <ListsOfRecommendations
              token={token}
              currentTrack={data.currentTrack}
            />
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
