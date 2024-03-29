import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "typeface-inter";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import mixpanel from "mixpanel-browser";

const client = new ApolloClient({
  uri: `https://distancely-dev.azurewebsites.net/api/GraphQL?code=FC9ushR1JEanYGS3Sve2bHAXIlK04SkXkHUYfJ5DBmHPdaateFeqTA==`, // todo: put in settings file
  // uri: `http://localhost:7071/api/GraphQL`,
  cache: new InMemoryCache(),
});

mixpanel.init("687be16b8c346b4bf1bd7fc5c3e9b3e0");

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
