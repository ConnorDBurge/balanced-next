import { NextRequest, NextResponse } from "next/server";
import { getClaims } from "@/lib/auth/session";

const API_URL = process.env.BALANCED_API_URL;
const API_KEY = process.env.BALANCED_API_KEY;

export async function POST(request: NextRequest) {
  const claims = await getClaims();
  if (!claims) {
    return NextResponse.json({ errors: [{ message: "Not authenticated" }] }, { status: 401 });
  }

  const body = await request.text();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${claims.token}`,
  };
  if (API_KEY) headers["X-API-Key"] = API_KEY;

  const response = await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers,
    body,
  });

  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
