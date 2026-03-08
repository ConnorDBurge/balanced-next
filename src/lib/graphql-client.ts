import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {
  registerApolloClient,
  InMemoryCache as RSCInMemoryCache,
} from "@apollo/client-integration-nextjs";
import { getClaims } from "@/lib/auth/session";

const API_URL = process.env.BALANCED_API_URL;
const API_KEY = process.env.BALANCED_API_KEY;

/**
 * Server-side Apollo Client for use in React Server Components.
 * Automatically injects the Bearer token and API key.
 */
export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const claims = await getClaims();

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: `${API_URL}/graphql`,
        headers: {
          ...(claims ? { Authorization: `Bearer ${claims.token}` } : {}),
          ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
        },
      }),
    });
  },
);

/**
 * Standalone Apollo Client for use in Server Actions where
 * registerApolloClient's singleton may not be available.
 */
export async function getActionClient() {
  const claims = await getClaims();
  if (!claims) throw new Error("Not authenticated");

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${API_URL}/graphql`,
      headers: {
        Authorization: `Bearer ${claims.token}`,
        ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
      },
    }),
  });
}
