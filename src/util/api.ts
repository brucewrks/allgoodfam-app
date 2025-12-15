import { WORKER_BASE_URL } from '@/config';

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: string;
  body?: unknown;
};

export async function api<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const res = await fetch(`${WORKER_BASE_URL}${path}`, {
    method: opts.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = data?.error ?? `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}
