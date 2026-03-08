import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const API_URL = process.env.BALANCED_API_URL || "http://localhost:8080";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider) {
        token.authProvider = account.provider;
      }

      if (account?.provider === "google") {
        if (account.id_token) token.googleIdToken = account.id_token;
        if (account.refresh_token)
          token.googleRefreshToken = account.refresh_token;
      }

      if (account?.id_token) {
        try {
          const res = await fetch(`${API_URL}/api/v1/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: account.id_token }),
          });

          if (res.ok) {
            const data = await res.json();
            token.apiToken = data.token;
            token.userId = data.userId;
            token.workspaceId = data.workspaceId;
            token.roles = data.roles;
          } else {
            console.error(
              `[auth] API token exchange failed: ${res.status}`,
            );
          }
        } catch (e) {
          console.error("[auth] API token exchange error:", e);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Browser only gets minimal session confirming authentication
      session.user = {} as never;
      session.authProvider = token.authProvider;
      return session;
    },
  },
});
