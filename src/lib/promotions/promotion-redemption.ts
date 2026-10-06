import prisma from "@/lib/prisma";

export async function findPromotionRedemption(phone: string) {
  return prisma.promoRedemption.findUnique({
    where: { id: phone },
  });
}

export async function createPromotionRedemption(phone: string, code: string, tourId: string) {
  return prisma.promoRedemption.create({
    data: { id: phone, code, tourId },
  });
}

export function isPromotionRedemptionConflict(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}
