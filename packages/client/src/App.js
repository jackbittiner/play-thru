import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/";
import { HomePageContainer } from "./pages/home/";
import { TrackRouterContainer } from "./pages/track-router";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

ReactGA.initialize("UA-150824990-1");

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute
        exact
        path="/track-router"
        component={TrackRouterContainer}
      />
      <PrivateRoute exact path="/home" component={HomePageContainer} />
    </Switch>
  </main>
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const hashParams = getHashParams(location);
        console.log(hashParams);
        return sessionStorage.getItem("accessToken") ||
          hashParams.access_token ? (
          <Component location={location} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
}

const App = () => {
  return (
    <div className="app">
      <Helmet>
        <title>Playthru - A song recommendation app for DJs</title>
        <meta
          name="description"
          content="A song recommendation app for DJs. Based on the Camelot Wheel and powered by the spotify API, you'll never have a bad mix again"
        />
        <meta
          name="keywords"
          content="DJ,mixing,camelot,wheel,music,recommendations,harmonic,keys,tempo"
        />
      </Helmet>
      <Main />
    </div>
  );
};

function getHashParams(location) {
  const hashParams = {};
  let e,
    regex = /([^&;=]+)=?([^&;]*)/g,
    queryString = location.hash.substring(1);
  e = regex.exec(queryString);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = regex.exec(queryString);
  }
  return hashParams;
}

export default App;
