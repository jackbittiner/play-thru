import React from "react";
import { Switch, Route } from "react-router-dom";
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
      <Route exact path="/home" component={HomePageContainer} />
      <Route exact path="/track-router" component={TrackRouterContainer} />
    </Switch>
  </main>
);

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

export default App;
