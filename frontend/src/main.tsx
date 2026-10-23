import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import client from "./apolloClient";
import { store } from "./store/store";
import "./index.css";

// This is the application entry point.
//
// The app uses two state providers:
// 1) ApolloProvider: GraphQL client / network layer
// 2) Provider: Redux global state
//
// BrowserRouter enables routing for the React UI.

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);