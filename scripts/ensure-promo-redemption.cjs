const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "PromoRedemption" (
      "id" TEXT NOT NULL,
      "code" TEXT NOT NULL,
      "tourId" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "PromoRedemption_pkey" PRIMARY KEY ("id")
    )
  `;

  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS "PromoRedemption_code_idx"
    ON "PromoRedemption"("code")
  `;
}

main()
  .catch((error) => {
    console.error("Unable to ensure promo redemption table:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
