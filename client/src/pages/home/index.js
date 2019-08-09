import React from 'react';

import styled from 'styled-components';

import NowPlaying from './display-components/now-playing';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
        key
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
  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  const params = getHashParams();
  const token = params.access_token;

  const { loading, error, data, refetch } = useQuery(GET_CURRENT_TRACK, {
    variables: { authToken: token }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Page>
      {token && (
        <React.Fragment>
          <CurrentTrack>
            {data && <NowPlaying currentTrack={data.currentTrack} />}
            <button onClick={() => refetch()}>Check Now Playing</button>
          </CurrentTrack>
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1px 1px;
  grid-template-areas: "CurrentTrack Sliders"
  "Recommendations Recommendations";
}
`;

const CurrentTrack = styled.div`
  grid-area: CurrentTrack;
`;
