import { authClient } from "@/lib/auth-client";
import { z } from "zod";

type SafeFetchOpts<T> = {
  url: string | URL | globalThis.Request;
  schema: z.ZodType<T>;
} & RequestInit;

async function safeFetch<T>(opts: SafeFetchOpts<T>) {
  const { url, schema, ...fetchOpts } = opts;
  const cookie = authClient.getCookie();
  // console.log("cookie", cookie);

  const res = await fetch(url, {
    ...fetchOpts,
    headers: {
      Cookie: cookie,
    },
  });

  if (!res.ok) {
    throw new Error("Network response was not ok " + res.statusText);
  }

  const data = await res.json();

  const parsedData = schema.parse(data);

  return { data: parsedData, res };
}
export default safeFetch;
