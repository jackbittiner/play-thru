import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
    </Switch>
  </main>
);

const App = () => (
  <div className="app">
    <Main />
  </div>
);

export default App;
