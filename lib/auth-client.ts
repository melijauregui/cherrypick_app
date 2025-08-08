import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "@/lib/auth";
import { router } from "expo-router";
import { BETTER_AUTH_URL } from "@/config/api";

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    expoClient({
      scheme: "cherrypick",
      storagePrefix: "cherrypick",
      storage: SecureStore,
    }),
  ],
});

export { authClient };
const { signIn, signUp, signOut, useSession: _useSession } = authClient;

function useSession() {
  const [first, setFirst] = useState(true);
  const session = _useSession();
  const isLoading = first || session.isPending;
  const authorized = session.data?.user.id;

  useEffect(() => {
    setFirst(false);
  }, [session.isPending]);

  if (session.error) {
    return { ...session.data, status: "error" };
  }

  return {
    ...session.data,
    status: authorized
      ? "authenticated"
      : isLoading
        ? "loading"
        : "unauthenticated",
  };
}

export { useSession, signIn, signUp, signOut };

export function OnlyAuthenticated({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") return null;

  if (status === "error") {
    router.replace("cherrypick:///error");
    return null;
  }

  if (status === "unauthenticated") {
    router.replace("cherrypick:///sign-in");
    return null;
  }

  return children;
}
