import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types/Auth";

type RoleGuardProps = {
    allowedRoles: Role[];
    children: React.ReactNode;
};

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
    const { role } = useAuth();

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return (
            <div style={{ padding: "20px" }}>
                <h3>Access denied</h3>
                <p>You do not have permission to access this page.</p>
            </div>
        );
    }

    return <>{children}</>;
}