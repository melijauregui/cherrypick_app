import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef, useState } from "react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "@/lib/auth";
import { router, usePathname } from "expo-router";
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
  const [forceUpdate, setForceUpdate] = useState(0);

  console.log("useSession!!!!!!!!");

  // Custom refetch that also gets fresh session data when needed
  const customRefetch = async () => {
    // First do the normal refetch
    const refetchResult = await session.refetch?.();

    // If user is authenticated but not email verified, get fresh session data
    if (session.data?.user && !session.data.user.emailVerified) {
      console.log(
        "User authenticated but not verified, getting fresh session data..."
      );
      try {
        const freshSession = await authClient.getSession({
          query: {
            disableCookieCache: true,
          },
        });

        // If we got fresh data and email is now verified, force a re-render
        if (freshSession.data?.user?.emailVerified) {
          console.log("Email is now verified, forcing re-render");
          setForceUpdate(prev => prev + 1);
        }
      } catch (error) {
        console.error("Error getting fresh session:", error);
      }
    }

    return refetchResult;
  };

  // Effect to handle force updates
  useEffect(() => {
    console.log("forceUpdate!!!!!!!!", forceUpdate);
    if (forceUpdate > 0) {
      console.log("Force update triggered, refetching session...");
      session.refetch?.();
    }
  }, [forceUpdate, session.refetch]);

  useEffect(() => {
    console.log("session.isPending!!!!!!!!", session.isPending);
    setFirst(false);
  }, [session.isPending]);

  if (session.error) {
    return { ...session.data, refetch: customRefetch, status: "error" };
  }

  return {
    ...session.data,
    refetch: customRefetch,
    status: authorized
      ? "authenticated"
      : isLoading
        ? "loading"
        : "unauthenticated",
  };
}

export { useSession, signIn, signUp, signOut };
export function OnlyAuthenticated({ children }: { children: React.ReactNode }) {
  const { status, user } = useSession();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (status === "error") {
      router.replace("cherrypick:///error");
    }
    if (status === "unauthenticated" && !hasRedirected) {
      console.log("User not authenticated, redirecting to sign-in");
      setHasRedirected(true);
      router.replace("cherrypick:///sign-in");
    }
    if (
      user &&
      !user?.emailVerified &&
      pathname !== "/code-verification-register"
    ) {
      router.replace("cherrypick:///code-verification-register");
    }
    // Reset flag when user becomes authenticated again
    if (status === "authenticated") {
      setHasRedirected(false);
    }
  }, [status, hasRedirected]);

  if (status === "loading") return null;

  // if (status === "error") {
  //   router.replace("melodia:///error");
  //   return null;
  // }

  // if (status === "unauthenticated") {
  //   router.replace("melodia:///sign-in");
  //   return null;
  // }

  return children;
}
