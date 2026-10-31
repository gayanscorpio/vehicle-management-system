import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { apolloClient } from "./apollo/apolloClient";
import { store } from "./store/store";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

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
    <ApolloProvider client={apolloClient}>  {/*Apollo handles GraphQL */}
      <Provider store={store}> {/* Redux handles app state */}
        <AuthProvider> {/* AuthContext handles login info and role */}
          <BrowserRouter> {/* BrowserRouter handles routes */}
            <App />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);