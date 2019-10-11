import React, { useState } from "react";
import getHashParams from "../utils/get-hash-params";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import HomePage from "./home-page";
import Script from "react-load-script";

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

function HomePageContainer() {
  const params = getHashParams();
  const token = params.access_token;

  const [deviceId, setDevice] = useState(null);

  const handleScriptLoad = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Play Thru",
        getOAuthToken: cb => {
          cb(token);
        }
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("player_state_changed", state => {
        console.log(state);
        refetch();
      });

      player.addListener("ready", ({ device_id }) => {
        setDevice(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    };
  };

  const { _loading, _error, data, refetch } = useQuery(GET_CURRENT_TRACK, {
    variables: { authToken: token }
  });

  return (
    <>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onLoad={() => handleScriptLoad()}
      />
      <HomePage
        data={data}
        refetch={refetch}
        token={token}
        deviceId={deviceId}
      />
    </>
  );
}

export default HomePageContainer;
