import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    authProvider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    apiToken?: string;
    userId?: string;
    workspaceId?: string;
    roles?: string[];
    authProvider?: string;
    googleIdToken?: string;
    googleRefreshToken?: string;
  }
}
