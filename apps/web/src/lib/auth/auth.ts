// Auth utilities and NextAuth configuration

import { authAdmin } from "../firebase/admin/firebase-admin";
import { logger } from '@/lib/logger';

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  customClaims?: Record<string, any>;
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Firebase",
      credentials: {
        idToken: { label: "ID Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.idToken) {
          return null;
        }

        try {
          const decodedToken = await authAdmin.verifyIdToken(credentials.idToken);
          return {
            id: decodedToken.uid,
            email: decodedToken.email || "",
            name: decodedToken.name || decodedToken.email?.split("@")[0] || "",
            image: decodedToken.picture || null,
            role: decodedToken.customClaims?.role || "user",
            emailVerified: decodedToken.email_verified || false,
          };
        } catch (error) {
          logger.error('Failed to verify Firebase token:', { error: String(error) });
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

/**
 * Verifies the Firebase ID token from the request headers
 * @param request - The incoming request object
 * @returns Promise<AuthUser | null>
 */
export async function verifyAuthToken(
  request: Request
): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await authAdmin.verifyIdToken(token);

    return {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
      emailVerified: decodedToken.email_verified || false,
      customClaims: decodedToken.custom_claims,
    };
  } catch (error) {
    logger.error('Auth token verification failed:', { error: String(error) });
    return null;
  }
}

/**
 * Gets the auth token from the request headers
 * @param request - The incoming request object
 * @returns string | null
 */
export function getAuthTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split("Bearer ")[1];
}

/**
 * Middleware helper to require authentication
 * @param request - The incoming request object
 * @returns Promise<AuthUser> - Throws if not authenticated
 */
export async function requireAuth(request: Request): Promise<AuthUser> {
  const user = await verifyAuthToken(request);

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}

/**
 * Check if user has admin role
 * @param user - The authenticated user
 * @returns boolean
 */
export function isAdmin(user: AuthUser): boolean {
  return user.customClaims?.role === "admin" || false;
}

/**
 * Check if user has builder role in any space
 * @param user - The authenticated user
 * @returns boolean
 */
export function isBuilder(user: AuthUser): boolean {
  return user.customClaims?.roles?.includes("builder") || false;
}

/**
 * Get current user (placeholder)
 * @returns Promise<AuthUser | null>
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  return null;
} 