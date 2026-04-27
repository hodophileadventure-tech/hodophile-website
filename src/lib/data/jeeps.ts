export interface JeepAddon {
  id: string;
  name: string;
  with_stay?: number; // price if staying at hotel
  without_stay?: number; // price if no hotel stay
  base_price?: number; // if no difference
  included?: boolean;
}

export interface JeepLocation {
  id: string;
  name: string;
  addons: JeepAddon[];
}

export const jeepAddons: JeepLocation[] = [
  {
    id: "skardu-jeeps",
    name: "Skardu & Basho",
    addons: [
      {
        id: "jeep-deosai-plains",
        name: "Deosai Plains",
        base_price: 15000,
      },
      {
        id: "jeep-fairy-meadows",
        name: "Fairy Meadows",
        base_price: 18000,
      },
      {
        id: "jeep-khaplu-palace",
        name: "Khaplu Palace Tour",
        base_price: 8000,
      },
    ],
  },
  {
    id: "hunza-jeeps",
    name: "Hunza",
    addons: [
      {
        id: "jeep-passu-glacier",
        name: "Passu Glacier Trek",
        base_price: 12000,
      },
      {
        id: "jeep-shandur-pass",
        name: "Shandur Pass",
        base_price: 10000,
      },
    ],
  },
  {
    id: "swat-jeeps",
    name: "Swat & Kalam",
    addons: [
      {
        id: "jeep-swat-activities",
        name: "Swat Adventure Activities",
        base_price: 5000,
      },
      {
        id: "jeep-malam-jabba",
        name: "Malam Jabba Ski Area",
        base_price: 8000,
      },
    ],
  },
];

export function getJeepsByLocation(locationId: string): JeepAddon[] {
  const location = jeepAddons.find((j) => j.id === locationId);
  return location?.addons || [];
}

export function calculateJeepCost(
  addons: { id: string; quantity: number }[]
): number {
  let total = 0;
  for (const addon of addons) {
    const jeepAddon = findJeepAddonById(addon.id);
    if (jeepAddon) {
      const price = jeepAddon.base_price || 0;
      total += price * addon.quantity;
    }
  }
  return total;
}

function findJeepAddonById(id: string): JeepAddon | undefined {
  for (const location of jeepAddons) {
    const addon = location.addons.find((a) => a.id === id);
    if (addon) return addon;
  }
  return undefined;
}
