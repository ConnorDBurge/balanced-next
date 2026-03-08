import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { isTokenExpiring, refreshGoogleIdToken } from "./token";

const API_URL = process.env.BALANCED_API_URL;

async function getDecodedJwt() {
  const cookieStore = await cookies();
  const secureCookie = cookieStore.get(
    "__Secure-authjs.session-token",
  )?.value;
  const devCookie = cookieStore.get("authjs.session-token")?.value;
  const sessionToken = secureCookie ?? devCookie;
  const salt = secureCookie
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  if (!sessionToken) return null;

  return await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
    salt,
  });
}

async function exchangeGoogleForApiToken(idToken: string) {
  const res = await fetch(`${API_URL}/api/v1/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) return null;
  return res.json();
}

export interface Claims {
  token: string;
  userId: string;
  workspaceId: string;
  roles: string[];
  email: string;
  name: string;
  authProvider?: string;
  googleIdToken?: string;
  googleRefreshToken?: string;
}

/** Server-only: read API claims from the encrypted session cookie. */
export async function getClaims(): Promise<Claims | null> {
  const decoded = await getDecodedJwt();
  if (!decoded?.apiToken) return null;

  if (
    typeof decoded.apiToken === "string" &&
    isTokenExpiring(decoded.apiToken) &&
    decoded.authProvider === "google"
  ) {
    let idToken =
      typeof decoded.googleIdToken === "string"
        ? decoded.googleIdToken
        : null;
    const refreshToken =
      typeof decoded.googleRefreshToken === "string"
        ? decoded.googleRefreshToken
        : null;

    if (!idToken || isTokenExpiring(idToken)) {
      idToken = refreshToken
        ? await refreshGoogleIdToken(refreshToken)
        : null;
      if (idToken) {
        decoded.googleIdToken = idToken;
      }
    }

    if (idToken) {
      const refreshed = await exchangeGoogleForApiToken(idToken);
      if (refreshed?.token) {
        decoded.apiToken = refreshed.token;
        decoded.userId = refreshed.userId;
        decoded.workspaceId = refreshed.workspaceId;
        decoded.roles = refreshed.roles ?? [];
        decoded.email = refreshed.email ?? decoded.email;
        const refreshedName = [refreshed.givenName, refreshed.familyName]
          .filter(Boolean)
          .join(" ")
          .trim();
        if (refreshedName) {
          decoded.name = refreshedName;
        }
      }
    }
  }

  return {
    token: decoded.apiToken as string,
    userId: decoded.userId as string,
    workspaceId: decoded.workspaceId as string,
    roles: decoded.roles as string[],
    email: decoded.email as string,
    name: decoded.name as string,
    authProvider: decoded.authProvider as string | undefined,
    googleIdToken: decoded.googleIdToken as string | undefined,
    googleRefreshToken: decoded.googleRefreshToken as string | undefined,
  };
}
