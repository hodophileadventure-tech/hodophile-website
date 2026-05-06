-- CreateTable
CREATE TABLE "PricingConfig" (
    "id" TEXT NOT NULL,
    "transportBaseMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "peakMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.3,
    "blossomMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.15,
    "offMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 0.85,
    "markupPercentage" DOUBLE PRECISION NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingConfig_pkey" PRIMARY KEY ("id")
);
