import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const ApolloApp = AppComponent => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(ApolloApp(App), document.getElementById("root"));

registerServiceWorker();
