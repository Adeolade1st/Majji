import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: { 
        enabled: true,
        requireEmailVerification: false, // Set to true in production
    },
    socialProviders: { 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
            redirectURI: `${process.env.BETTER_AUTH_URL || 'http://localhost:5173'}/api/auth/callback/google`,
        },
    },
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5173',
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
    user: {
        additionalFields: {
            type: {
                type: "string",
                required: false,
            },
            company: {
                type: "string", 
                required: false,
            },
            verified: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
            needsOnboarding: {
                type: "boolean",
                required: false,
                defaultValue: true,
            },
        },
    },
});