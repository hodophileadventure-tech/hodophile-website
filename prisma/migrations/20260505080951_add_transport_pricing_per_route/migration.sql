-- CreateTable
CREATE TABLE "TransportPricing" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "fuelPricePerLiter" INTEGER NOT NULL,
    "dailyRentalRate" INTEGER NOT NULL,
    "vehicleAverageConsumption" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransportPricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransportPricing_routeId_key" ON "TransportPricing"("routeId");

-- CreateIndex
CREATE INDEX "TransportPricing_routeId_idx" ON "TransportPricing"("routeId");

-- AddForeignKey
ALTER TABLE "TransportPricing" ADD CONSTRAINT "TransportPricing_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
