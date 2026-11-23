CREATE TABLE "TransportSettings" (
    "id" TEXT NOT NULL DEFAULT 'transport-settings-default',
    "petrolPricePerLiter" DOUBLE PRECISION,
    "dieselPricePerLiter" DOUBLE PRECISION,
    "additionalDistanceKm" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "additionalDistancePercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "includeReturnJourney" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TransportSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TransportVehicleConfig" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "averageKmPerLiter" DOUBLE PRECISION NOT NULL,
    "fuelPricePerLiter" DOUBLE PRECISION,
    "maintenanceCostPerKm" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TransportVehicleConfig_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RouteDistanceCache" (
    "id" TEXT NOT NULL,
    "stops" JSONB NOT NULL,
    "legs" JSONB NOT NULL,
    "geometry" JSONB NOT NULL,
    "distanceKm" DOUBLE PRECISION NOT NULL,
    "durationSeconds" DOUBLE PRECISION,
    "source" TEXT NOT NULL DEFAULT 'OPENROUTESERVICE',
    "manualOverride" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RouteDistanceCache_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TransportVehicleConfig_name_key" ON "TransportVehicleConfig"("name");
CREATE INDEX "TransportVehicleConfig_enabled_idx" ON "TransportVehicleConfig"("enabled");
CREATE INDEX "RouteDistanceCache_expiresAt_idx" ON "RouteDistanceCache"("expiresAt");
CREATE INDEX "RouteDistanceCache_manualOverride_idx" ON "RouteDistanceCache"("manualOverride");
