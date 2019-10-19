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
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQLURI || "http://localhost:4000"
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
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
