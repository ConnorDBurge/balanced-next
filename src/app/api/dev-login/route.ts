import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 },
    );
  }

  const apiUrl = process.env.BALANCED_API_URL || "http://localhost:8080";
  const { searchParams } = new URL(request.url);
  const email =
    searchParams.get("email") || "connor.d.burge@gmail.com";

  // Use the public bootstrap endpoint to get a token without OAuth
  const res = await fetch(`${apiUrl}/api/v1/auth/bootstrap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      givenName: "Dev",
      familyName: "User",
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Backend token exchange failed", status: res.status },
      { status: 502 },
    );
  }

  const data = await res.json();

  const salt = "authjs.session-token";
  const sessionToken = await encode({
    token: {
      apiToken: data.token,
      userId: data.userId,
      workspaceId: data.workspaceId,
      roles: data.roles ?? [],
      authProvider: "dev",
      email: data.email,
      name: `${data.givenName ?? ""} ${data.familyName ?? ""}`.trim(),
    },
    secret: process.env.NEXTAUTH_SECRET!,
    salt,
  });

  const response = NextResponse.redirect(
    new URL(
      "/transactions",
      process.env.AUTH_URL || "http://localhost:3000",
    ),
  );
  response.cookies.set("authjs.session-token", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
