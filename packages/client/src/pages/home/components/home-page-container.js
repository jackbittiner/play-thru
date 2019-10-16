import React, { useState } from "react";
import getHashParams from "../utils/get-hash-params";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import HomePage from "./home-page";
import Script from "react-load-script";

const GET_TRACK = gql`
  query track($authToken: String!, $trackId: String!) {
    track(authToken: $authToken, trackId: $trackId) {
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

  if (token) {
    sessionStorage.setItem("accessToken", params.access_token);
    window.history.replaceState({}, document.title, "/home");
  }

  const [deviceId, setDevice] = useState(null);

  const authToken = sessionStorage.getItem("accessToken");

  if (!authToken) {
    window.location.href = "/";
  }

  const handleScriptLoad = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Play Thru",
        getOAuthToken: cb => {
          cb(authToken);
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
        console.log(state.track_window.current_track.id);
        getCurrentTrack({
          variables: {
            authToken: authToken,
            trackId: state.track_window.current_track.id
          }
        });
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

  const [getCurrentTrack, { data }] = useLazyQuery(GET_TRACK);

  return (
    <>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onLoad={() => handleScriptLoad()}
      />
      <HomePage data={data} deviceId={deviceId} />
    </>
  );
}

export default HomePageContainer;
