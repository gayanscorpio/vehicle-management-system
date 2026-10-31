export type Role = "ADMIN" | "USER";

export type AuthUser = {
    token: string;
    username: string;
    role: Role;
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = AuthUser;