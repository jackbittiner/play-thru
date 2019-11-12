import React, { useState, useEffect } from "react";
import getHashParams from "../utils/get-hash-params";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_TRACK } from "./get-track";
import { GET_CURRENT_USER } from "./get-current-user";
import HomePage from "./home-page";
import Script from "react-load-script";
import ReactGA from "react-ga";
import FreeAccountError from "./free-account-error";
import handleScriptLoad from "./handle-spotify-script-load";

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

  const [getCurrentTrack, { data }] = useLazyQuery(GET_TRACK);

  const { data: accountData, loading } = useQuery(GET_CURRENT_USER);

  const userId = (accountData && accountData.account.id) || "";

  const isPremium = accountData && accountData.account.isPremium;

  userId !== "" && ReactGA.set({ userId: userId });

  if (!loading && !isPremium) return <FreeAccountError />;

  return (
    <React.Fragment>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onLoad={() =>
          handleScriptLoad({
            authToken,
            setPausedState,
            getCurrentTrack,
            setDevice
          })
        }
      />
      <HomePage
        data={data}
        deviceId={deviceId}
        paused={paused}
        userId={userId}
      />
    </React.Fragment>
  );
}

export default HomePageContainer;
