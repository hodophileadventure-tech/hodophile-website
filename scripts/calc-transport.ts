import { calculateTransportCost } from "../src/lib/pricingEngine";

function run() {
  // Force vehicleDays = 3 and distanceOverride = 2500 to reproduce the observed transport
  const vehicleName = "Coaster 4C";
  const routeId = "naran-hunza-skardu-deosai-12days";
  const vehicleDays = 3;
  const distanceOverride = 2500;

  const transport = calculateTransportCost(vehicleName, routeId, vehicleDays, distanceOverride, "road");
  console.log({ vehicleName, routeId, vehicleDays, distanceOverride, transport });

  if (transport) {
    const hotel = 190000;
    const jeep = 20000;
    const subtotal = transport.totalCost + hotel + jeep;
    const markup = Math.round(subtotal * 0.22);
    const total = subtotal + markup;
    console.log({ subtotal, markup, total });
  }
}

run();
