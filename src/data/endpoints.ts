export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiEndpoint {
  name: string;
  method: HttpMethod;
  path: string;
}

export type GroupedEndpoints = Record<string, ApiEndpoint[]>;

export const BASE_URL = "https://api.ness.biz.id";

export async function fetchEndpoints(): Promise<GroupedEndpoints> {
  const res = await fetch(`${BASE_URL}/list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch API list: ${res.status}`);
  }

  const data: GroupedEndpoints = await res.json();

  return data;
}
