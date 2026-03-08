import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { graphql } from "@/__generated__/gql";
import { getClient } from "@/lib/graphql-client";
import { getClaims } from "@/lib/auth/session";
import {
  UserProvider,
} from "@/components/providers/user-provider";
import {
  WorkspaceProvider,
  type WorkspaceRole,
} from "@/components/providers/workspace-provider";

const SELF_QUERY = graphql(`
  query Self {
    self {
      id
      email
      givenName
      familyName
    }
  }
`);

const WORKSPACES_QUERY = graphql(`
  query Workspaces {
    workspaces {
      id
      name
      status
    }
  }
`);

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const claims = await getClaims();
  const client = await getClient();

  const [{ data: userData }, { data: workspaceData }] = await Promise.all([
    client.query({ query: SELF_QUERY }),
    client.query({ query: WORKSPACES_QUERY }),
  ]);

  const self = userData?.self;
  const user = {
    name: [self?.givenName, self?.familyName].filter(Boolean).join(" ") || claims?.name || "User",
    email: self?.email ?? claims?.email ?? "",
  };

  const workspaces = workspaceData?.workspaces ?? [];
  const currentWorkspaceId = claims?.workspaceId ?? "";
  const currentWorkspace = workspaces.find(
    (w) => w.id === currentWorkspaceId,
  ) ?? { id: currentWorkspaceId, name: "Workspace" };

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <UserProvider user={user} signOutAction={handleSignOut}>
      <WorkspaceProvider
        workspace={currentWorkspace}
        workspaces={workspaces}
        roles={(claims?.roles ?? []) as WorkspaceRole[]}
        userId={claims?.userId ?? ""}
      >
        {children}
      </WorkspaceProvider>
    </UserProvider>
  );
}
