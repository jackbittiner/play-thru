import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import HomeV2 from "./pages/home/home-v2";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={HomeV2} />
    </Switch>
  </main>
);

const App = () => (
  <div className="app">
    <Main />
  </div>
);

export default App;
