import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { apolloClient } from "./apollo/apolloClient";
import LoginPage from "./components/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleGuard } from "./components/RoleGuard";
import VehicleList from "./components/VehicleList";
import VehicleForm from "./components/VehicleForm";

function AppShell() {
  const { role, logoutUser, username } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
          paddingBottom: "10px",
        }}
      >
        <div>
          <h2>Vehicle System</h2>
          {username && <small>Logged in as: {username}</small>}
        </div>

        <nav style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link to="/vehicles">Vehicles</Link>

          {role === "ADMIN" && (
            <Link to="/vehicles/new">Create Vehicle</Link>
          )}

          {username ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/vehicles" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <VehicleList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/new"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["ADMIN"]}>
                <VehicleForm />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/:id"
          element={
            <ProtectedRoute>
              <VehicleList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/:id/edit"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["ADMIN"]}>
                <VehicleForm />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </ApolloProvider>
  );
}