import React, { useState, useEffect } from "react";
import getHashParams from "../utils/get-hash-params";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_TRACK } from "./get-track";
import { GET_CURRENT_USER } from "./get-current-user";
import HomePage from "./home-page";
import Script from "react-load-script";
import ReactGA from "react-ga";
import FreeAccountError from "./free-account-error";

function HomePageContainer({ location }) {
  useEffect(() => {
    ReactGA.pageview(location.pathname);
  });

  const params = getHashParams(location);
  const token = params.access_token;

  if (token) {
    sessionStorage.setItem("accessToken", params.access_token);
    window.history.replaceState({}, document.title, "/home");
  }

  const [deviceId, setDevice] = useState(null);
  const [paused, setPausedState] = useState(true);

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
        setPausedState(state.paused);
        getCurrentTrack({
          variables: {
            trackId: state.track_window.current_track.id
          }
        });
      });

      player.addListener("ready", ({ device_id }) => {
        sessionStorage.removeItem("setlist");
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

  const { data: accountData } = useQuery(GET_CURRENT_USER);

  const userId = (accountData && accountData.account.id) || "";
  const isPremium = accountData && accountData.account.isPremium;

  userId !== "" && ReactGA.set({ userId: userId });

  if (!isPremium) return <FreeAccountError />;

  return (
    <>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onLoad={() => handleScriptLoad()}
      />
      <HomePage
        data={data}
        deviceId={deviceId}
        paused={paused}
        userId={userId}
      />
    </>
  );
}

export default HomePageContainer;
