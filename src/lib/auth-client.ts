import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession, updateUser } = createAuthClient({
    baseURL: import.meta.env.VITE_AUTH_URL || "http://localhost:5173",
    plugins: [],
});