import { calculateQuotation, formatPKR } from "../src/lib/pricingEngine";

async function run() {
  const input = {
    routeId: "custom-route",
    vehicleName: "Toyota Corolla",
    numberOfRooms: 1,
    adults: 2,
    kids: 0,
    customCities: ["Hunza", "Skardu", "Chilas"],
    multiCityNights: { Hunza: 4, Skardu: 5, Chilas: 1 },
    multiCityHotels: {
      Hunza: { hotelId: "mulberry-hotel-hunza", roomId: "Deluxe" },
      Skardu: { hotelId: "ifq-premier-skardu", roomId: "Standard" },
      Chilas: { hotelId: "sun-rise-hotel-chilas", roomId: "Standard Room" },
    },
    customRouteLabel: "Hunza - Skardu - Chilas Custom",
    tripDate: "2026-05-05",
  } as any;

  const q = calculateQuotation(input);
  console.log("\n=== QUOTATION RESULT ===\n");
  console.log(JSON.stringify(q, null, 2));

  if (q && q.transportBreakdown) {
    console.log("\nTransport breakdown:\n");
    console.log(`Fuel: ${formatPKR(q.transportBreakdown.fuelCost)}`);
    console.log(`Rental: ${formatPKR(q.transportBreakdown.rentalCost)} (${q.transportBreakdown.vehicleDays} days @ ${formatPKR(q.transportBreakdown.dailyRate)})`);
    console.log(`Toll/Tax: ${formatPKR(q.transportBreakdown.tollTax)}`);
    console.log(`Total transport: ${formatPKR(q.transportBreakdown.fuelCost + q.transportBreakdown.rentalCost + q.transportBreakdown.tollTax)}`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
