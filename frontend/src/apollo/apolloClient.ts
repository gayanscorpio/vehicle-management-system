import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    HttpLink,
} from "@apollo/client";

// This file creates the Apollo Client instance used by the React app
// to communicate with the Spring Boot GraphQL backend.
//
// The backend GraphQL endpoint is typically:
// http://localhost:8080/graphql
//
// We read the URL from environment variables so it can change per environment
// (local, staging, production) without changing the code.
const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://api.local/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token");

    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    return forward(operation);
});

// ApolloClient is the main GraphQL client used by React components.
// It handles:
// - creating queries/mutations
// - sending requests to the backend
// - caching query results
// - automatic re-rendering via React hooks
export const apolloClient = new ApolloClient({
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
                        keyArgs: ["page", "size", "vin", "plateNumber", "make", "model", "year"],
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                },
            },
        },
    }),
});