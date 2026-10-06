CREATE TABLE "PromoRedemption" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoRedemption_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "PromoRedemption_code_idx" ON "PromoRedemption"("code");
