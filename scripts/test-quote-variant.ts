import { calculateQuotation } from "../src/lib/pricingEngine";

async function run() {
  const payload = {
    routeId: "naran-hunza-skardu-deosai-12days",
    vehicleName: "Coaster 4C",
    customCities: ["Islamabad", "Skardu", "Hunza", "Naran"],
    multiCityHotels: {
      Skardu: { hotelId: "rockview-hotel-skardu", roomId: "Standard" },
      Hunza: { hotelId: "hunza-bliss-hunza", roomId: "Standard Room (1 Master + 1 Sofa Bed)" },
      Naran: { hotelId: "kings-inn-naran", roomId: "Standard Room" },
      Islamabad: { hotelId: "hotel-index-islamabad", roomId: "Master" },
    },
    // Deliberately only Skardu nights provided to match observed logs (3 vehicle days)
    multiCityNights: { Skardu: 3, Hunza: 0, Naran: 0, Islamabad: 0 },
    numberOfRooms: 5,
    adults: 20,
    kids: 0,
    tripDate: "2026-06-30",
    mandatoryJeepCost: 20000, // as in the Railway notification
  } as any;

  const result = calculateQuotation(payload);
  console.log(JSON.stringify({ input: payload, result }, null, 2));
}

run().catch((e) => {
  console.error("Error running test variant:", e);
  process.exit(1);
});
