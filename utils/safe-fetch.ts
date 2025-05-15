import { z } from "zod";

type SafeFetchOpts<T> = {
  url: string | URL | globalThis.Request;
  schema: z.ZodType<T>;
} & RequestInit;

export async function safeFetch<T>(opts: SafeFetchOpts<T>) {
  const { url, schema, ...fetchOpts } = opts;
  const res = await fetch(url, fetchOpts);

  if (!res.ok) {
    throw new Error("Network response was not ok " + res.statusText);
  }

  const data = await res.json();

  const parsedData = schema.parse(data);

  return { data: parsedData, res };
}
