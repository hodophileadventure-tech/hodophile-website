import { calculateQuotation } from "../src/lib/pricingEngine";

async function run() {
  const payload = {
    routeId: "naran-hunza-skardu-deosai-12days",
    vehicleName: "Coaster 4C",
    multiCityHotels: {
      Skardu: { hotelId: "rockview-hotel-skardu", roomId: "Standard" },
      Hunza: { hotelId: "hunza-bliss-hunza", roomId: "Standard Room (1 Master + 1 Sofa Bed)" },
      Naran: { hotelId: "kings-inn-naran", roomId: "Standard Room" },
      Islamabad: { hotelId: "hotel-index-islamabad", roomId: "Master" },
    },
    multiCityNights: { Skardu: 3, Hunza: 2, Naran: 1, Islamabad: 0 },
    numberOfRooms: 5,
    adults: 20,
    kids: 0,
    tripDate: "2026-06-01",
    mandatoryJeepCost: 60000, // 3 jeeps × 20000
  } as any;

  const result = calculateQuotation(payload);
  console.log(JSON.stringify({ input: payload, result }, null, 2));
}

run().catch((e) => {
  console.error("Error running test:", e);
  process.exit(1);
});
