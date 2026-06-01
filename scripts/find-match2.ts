import { calculateQuotation } from "../src/lib/pricingEngine";
import { vehicleRates } from "../src/lib/data/vehicleRates";

const vehicles = vehicleRates.map(v => v.name);
const roomsOptions = [3,4,5,6];
const jeepCosts = [0,20000,40000,60000];

let found = false;
for (const vehicle of vehicles) {
  for (const rooms of roomsOptions) {
    for (const jeep of jeepCosts) {
      const payload: any = {
        routeId: "naran-hunza-skardu-deosai-12days",
        vehicleName: vehicle,
        multiCityHotels: {
          Skardu: { hotelId: "rockview-hotel-skardu", roomId: "Standard" },
          Hunza: { hotelId: "hunza-bliss-hunza", roomId: "Standard Room (1 Master + 1 Sofa Bed)" },
          Naran: { hotelId: "kings-inn-naran", roomId: "Standard Room" },
          Islamabad: { hotelId: "hotel-index-islamabad", roomId: "Master" },
        },
        multiCityNights: { Skardu: 3, Hunza: 2, Naran: 1, Islamabad: 0 },
        numberOfRooms: rooms,
        adults: 20,
        kids: 0,
        tripDate: "2026-06-01",
        mandatoryJeepCost: jeep,
      };

      const q = calculateQuotation(payload as any);
      if (!q) continue;
      if (q.totalCost === 591400) {
        console.log("FOUND", { vehicle, rooms, jeep, subtotal: q.subtotal, total: q.totalCost });
        found = true;
      }
    }
  }
}
if (!found) console.log('No exact matches found');
