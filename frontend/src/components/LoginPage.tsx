import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/authService";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        try {
            const user = await loginRequest({ username, password });
            loginUser(user);
            navigate("/vehicles");
        } catch (err: any) {
            setError(err.message || "Invalid username or password");
        }
    };

    return (
        <div
            style={{
                maxWidth: "420px",
                margin: "80px auto",
                padding: "24px",
                border: "1px solid #ddd",
                borderRadius: "10px",
            }}
        >
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Username
                        <br />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: "100%", padding: "8px" }}
                            required
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "12px" }}>
                    <label>
                        Password
                        <br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "8px" }}
                            required
                        />
                    </label>
                </div>

                {error && (
                    <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>
                )}

                <button type="submit" style={{ width: "100%", padding: "10px" }}>
                    Sign In
                </button>
            </form>
        </div>
    );
}