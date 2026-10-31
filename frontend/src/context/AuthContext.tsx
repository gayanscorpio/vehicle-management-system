import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AuthUser, Role } from "../types/Auth";

type AuthContextType = {
    token: string | null;
    username: string | null;
    role: Role | null;
    loginUser: (user: AuthUser) => void;
    logoutUser: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [username, setUsername] = useState<string | null>(
        localStorage.getItem("username")
    );
    const [role, setRole] = useState<Role | null>(
        (localStorage.getItem("role") as Role) || null
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (username) {
            localStorage.setItem("username", username);
        } else {
            localStorage.removeItem("username");
        }
    }, [username]);

    useEffect(() => {
        if (role) {
            localStorage.setItem("role", role);
        } else {
            localStorage.removeItem("role");
        }
    }, [role]);

    const loginUser = (user: AuthUser) => {
        setToken(user.token);
        setUsername(user.username);
        setRole(user.role);
    };

    const logoutUser = () => {
        setToken(null);
        setUsername(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    };

    const value = useMemo<AuthContextType>(
        () => ({
            token,
            username,
            role,
            loginUser,
            logoutUser,
            isAuthenticated: !!token,
        }),
        [token, username, role]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}