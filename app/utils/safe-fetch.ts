import { authClient } from "@/lib/auth-client";
import { z } from "zod";

type SafeFetchOpts<TOutput, TInput = unknown> = {
  url: string | URL | globalThis.Request;
} & RequestInit;

async function safeFetch<T>(opts: SafeFetchOpts<T>) {
  const { url, ...fetchOpts } = opts;
  const cookie = authClient.getCookie();
  // console.log("cookie", cookie);

  const res = await fetch(url, {
    ...fetchOpts,
    headers: {
      ...fetchOpts.headers,
      Cookie: cookie,
    },
  });

  if (!res.ok) {
    throw new Error("Network response was not ok " + res.statusText);
  }

  const data = await res.json();

  return { data, res };
}
export default safeFetch;
