import { timingSafeEqual } from "node:crypto";

export function isTransportAdminConfigured(): boolean {
  const key = process.env.TRANSPORT_ADMIN_API_KEY;
  return Boolean(key && key.length >= 32);
}

export function isTransportAdminAuthorized(authorizationHeader: string | null): boolean {
  const expectedKey = process.env.TRANSPORT_ADMIN_API_KEY;
  if (!expectedKey || expectedKey.length < 32 || !authorizationHeader?.startsWith("Bearer ")) {
    return false;
  }

  const candidate = Buffer.from(authorizationHeader.slice("Bearer ".length));
  const expected = Buffer.from(expectedKey);
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}
