interface RateLimitBucket {
  startedAt: number;
  requests: number;
}

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const buckets = new Map<string, RateLimitBucket>();

export function allowRouteCalculation(identifier: string, now = Date.now()): boolean {
  if (buckets.size > 5_000) {
    for (const [key, bucket] of buckets) {
      if (now - bucket.startedAt >= WINDOW_MS) buckets.delete(key);
    }
    if (buckets.size > 5_000) buckets.clear();
  }

  const current = buckets.get(identifier);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    buckets.set(identifier, { startedAt: now, requests: 1 });
    return true;
  }

  if (current.requests >= MAX_REQUESTS_PER_WINDOW) return false;
  current.requests += 1;
  return true;
}
