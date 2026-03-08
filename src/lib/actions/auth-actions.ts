"use server";

import { cookies } from "next/headers";
import { encode } from "next-auth/jwt";
import { graphql } from "@/__generated__/gql";
import { getClaims } from "@/lib/auth/session";
import { getActionClient } from "@/lib/graphql-client";

const PROVISION_WORKSPACE = graphql(`
  mutation ProvisionWorkspace($input: CreateWorkspaceInput!) {
    provisionWorkspace(input: $input) {
      id
      name
      token
    }
  }
`);

const SWITCH_WORKSPACE = graphql(`
  mutation SwitchWorkspace($input: SwitchWorkspaceInput!) {
    switchWorkspace(input: $input) {
      id
      name
      token
    }
  }
`);

async function updateSessionCookie(
  newToken: string,
  newWorkspaceId: string,
) {
  const claims = await getClaims();
  if (!claims) throw new Error("Not authenticated");

  const isSecure =
    process.env.NEXTAUTH_URL?.startsWith("https://") ?? false;
  const cookieName = isSecure
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const sessionToken = await encode({
    token: {
      apiToken: newToken,
      userId: claims.userId,
      workspaceId: newWorkspaceId,
      roles: claims.roles,
      authProvider: claims.authProvider,
      googleIdToken: claims.googleIdToken,
      googleRefreshToken: claims.googleRefreshToken,
      email: claims.email,
      name: claims.name,
    },
    secret: process.env.NEXTAUTH_SECRET!,
    salt: cookieName,
  });

  const cookieStore = await cookies();
  cookieStore.set(cookieName, sessionToken, {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
  });
}

export async function provisionWorkspace(
  name: string,
): Promise<{ name: string }> {
  const client = await getActionClient();
  const { data } = await client.mutate({
    mutation: PROVISION_WORKSPACE,
    variables: { input: { name } },
  });

  if (!data?.provisionWorkspace) throw new Error("Failed to provision workspace");

  await updateSessionCookie(
    data.provisionWorkspace.token,
    data.provisionWorkspace.id,
  );

  return { name: data.provisionWorkspace.name };
}

export async function switchWorkspace(
  workspaceId: string,
): Promise<{ name: string }> {
  const client = await getActionClient();
  const { data } = await client.mutate({
    mutation: SWITCH_WORKSPACE,
    variables: { input: { workspaceId } },
  });

  if (!data?.switchWorkspace) throw new Error("Failed to switch workspace");

  await updateSessionCookie(
    data.switchWorkspace.token,
    data.switchWorkspace.id,
  );

  return { name: data.switchWorkspace.name };
}
