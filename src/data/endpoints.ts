export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiEndpoint {
  name: string;
  method: HttpMethod;
  path: string;
  tag: string;
}

export const BASE_URL = "https://api.ness.biz.id";

export async function fetchEndpoints(): Promise<ApiEndpoint[]> {
  const res = await fetch(`${BASE_URL}/list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch API list");
  }

  return res.json();
}
