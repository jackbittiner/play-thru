import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { GET_TRACK } from "./get-track";
import { GET_CURRENT_USER } from "./get-current-user";
import HomePage from "./home-page";
import Script from "react-load-script";
import ReactGA from "react-ga";
import FreeAccountError from "./free-account-error";
import handleScriptLoad from "./handle-spotify-script-load";
import { RouterProps } from "../../../common/types";

function HomePageContainer({ location }: RouterProps) {
  useEffect(() => {
    ReactGA.pageview(location.pathname);
  });

  window.history.replaceState({}, document.title, "/home");

  const [deviceId, setDevice] = useState("");
  const [paused, setPausedState] = useState(true);

  const authToken = sessionStorage.getItem("accessToken");

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
            setDevice,
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
