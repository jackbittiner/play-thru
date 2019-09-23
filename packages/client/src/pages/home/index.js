import React, { useState } from "react";

import styled from "styled-components";

import NowPlaying from "./display-components/now-playing";
import ListsOfRecommendations from "./display-components/list-of-recommendations";
import TopTracks from "./display-components/top-tracks";
import isEmpty from "lodash/isEmpty";
import DeviceSelector from "./display-components/device-selector";
import getHashParams from "./utils/get-hash-params";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_CURRENT_TRACK = gql`
  query currentTrack($authToken: String!) {
    currentTrack(authToken: $authToken) {
      name
      art
      id
      popularity
      artist {
        id
        name
      }
      trackFeatures(authToken: $authToken) {
        key {
          name
          pitchClass
          mode
        }
        tempo
        time_signature
        harmonicKeys {
          name
          pitchClass
          mode
        }
        danceability
        energy
        valence
      }
    }
  }
`;

function HomeV2Container() {
  const params = getHashParams();
  const token = params.access_token;

  const [currentDevice, setCurrentDevice] = useState();
  const { _loading, _error, data, refetch } = useQuery(GET_CURRENT_TRACK, {
    variables: { authToken: token }
  });

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

export default HomeV2Container;

const Page = styled.div`
  display: grid;
  text-align: center;
  height: 100%;
}
`;

const CurrentTrack = styled.div`
  grid-area: CurrentTrack;
`;
