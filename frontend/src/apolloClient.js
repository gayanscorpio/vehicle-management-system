import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// This file creates the Apollo Client instance used by the React app
// to communicate with the Spring Boot GraphQL backend.
//
// The backend GraphQL endpoint is typically:
// http://localhost:8080/graphql
//
// We read the URL from environment variables so it can change per environment
// (local, staging, production) without changing the code.
const httpLink = createHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://localhost:8080/graphql",
});

// Optional auth middleware:
// If you later add JWT or bearer token authentication,
// this is the proper place to attach the Authorization header
// to every outgoing GraphQL request.
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
});

// ApolloClient is the main GraphQL client used by React components.
// It handles:
// - creating queries/mutations
// - sending requests to the backend
// - caching query results
// - automatic re-rendering via React hooks
const client = new ApolloClient({
    // The request pipeline: first add auth info, then send to GraphQL endpoint
    link: authLink.concat(httpLink),

    // InMemoryCache stores GraphQL results in memory so React can re-use data
    // and avoid unnecessary network calls.
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    vehicles: {
                        // Helps merge paginated data when fetching list results
                        // across multiple calls.
                        keyArgs: ["vin", "plateNumber", "make", "model", "year"],
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                },
            },
        },
    }),
});

export default client;