import { LoginRequest, LoginResponse } from "../types/Auth";

export async function loginRequest(payload: LoginRequest): Promise<LoginResponse> {
    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
    }

    return response.json();
}