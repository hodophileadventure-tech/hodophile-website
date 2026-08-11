export type UmrahPackage = {
  id: string;
  name: string;
  originalTier: string;
  duration: 15 | 20;
  tagline?: string;
  makkah: {
    hotel: string;
    distance: string;
  };
  madinah: {
    hotel: string;
    distance: string;
  };
  prices: {
    quint: number;
    quad: number;
    triple: number;
    double: number;
  };
};

export const umrahPackages: UmrahPackage[] = [
  {
    id: "20-safar",
    originalTier: "Bronze",
    name: "SAFAR",
    tagline: "A Journey of Faith",
    duration: 20,
    makkah: { hotel: "Hidaya Tower", distance: "Shuttle" },
    madinah: { hotel: "Ritaj Al Madinah", distance: "Shuttle" },
    prices: { quint: 232197, quad: 240613, triple: 256259, double: 277904 },
  },
  {
    id: "20-noor",
    originalTier: "Silver",
    name: "NOOR",
    tagline: "A Journey Illuminated",
    duration: 20,
    makkah: { hotel: "Fundaq Bilal", distance: "Shuttle" },
    madinah: { hotel: "Ritaj Al Madinah", distance: "Shuttle" },
    prices: { quint: 236338, quad: 243821, triple: 258118, double: 284319 },
  },
  {
    id: "20-sukoon",
    originalTier: "Golden",
    name: "SUKOON",
    tagline: "A Journey of Serenity",
    duration: 20,
    makkah: { hotel: "Land Premium", distance: "1000 MTR" },
    madinah: { hotel: "Shaza Muwannara", distance: "850 MTR" },
    prices: { quint: 257912, quad: 272756, triple: 296699, double: 342190 },
  },
  {
    id: "20-barakah",
    originalTier: "Platinum",
    name: "BARAKAH",
    tagline: "A Journey Blessed",
    duration: 20,
    makkah: { hotel: "Jowhra Majid", distance: "750 MTR" },
    madinah: { hotel: "Diyar Al Aws", distance: "450 MTR" },
    prices: { quint: 264910, quad: 281504, triple: 308362, double: 359685 },
  },
  {
    id: "20-rahat",
    originalTier: "Diamond",
    name: "RAHAT",
    tagline: "A Journey of Comfort",
    duration: 20,
    makkah: { hotel: "Mather Al Jawwar", distance: "550 MTR" },
    madinah: { hotel: "Bir Al Eiman", distance: "350 MTR" },
    prices: { quint: 285356, quad: 307062, triple: 342440, double: 410802 },
  },
  {
    id: "20-manzil",
    originalTier: "Royal",
    name: "MANZIL",
    tagline: "A Journey Beyond",
    duration: 20,
    makkah: { hotel: "Voco", distance: "Shuttle" },
    madinah: { hotel: "Artal Intl", distance: "350 MTR" },
    prices: { quint: 287272, quad: 315189, triple: 353276, double: 427056 },
  },
  {
    id: "20-rehmat",
    originalTier: "Elite",
    name: "REHMAT",
    tagline: "A Journey of Blessings",
    duration: 20,
    makkah: { hotel: "Zilal Al Zulzula", distance: "350 MTR" },
    madinah: { hotel: "Taif Nabras", distance: "200 MTR" },
    prices: { quint: 293336, quad: 317037, triple: 355740, double: 430752 },
  },
  {
    id: "20-haramain",
    originalTier: "VIP",
    name: "HARAMAIN",
    tagline: "Closer to the Sacred",
    duration: 20,
    makkah: { hotel: "Nawarat Ul Shams 3", distance: "300 MTR" },
    madinah: { hotel: "Plaza Unhood", distance: "300 MTR" },
    prices: { quint: 305147, quad: 331800, triple: 375424, double: 460278 },
  },
  {
    id: "20-aafiyat",
    originalTier: "Prestige",
    name: "AAFIYAT",
    tagline: "A Journey in Comfort",
    duration: 20,
    makkah: { hotel: "Le Meridien", distance: "Shuttle" },
    madinah: { hotel: "Grand Zawar", distance: "250 MTR" },
    prices: { quint: 301795, quad: 327611, triple: 369838, double: 451899 },
  },
  {
    id: "20-maqam",
    originalTier: "Signature",
    name: "MAQAM",
    tagline: "The Ultimate Journey",
    duration: 20,
    makkah: { hotel: "Makkah Tower", distance: "250 MTR" },
    madinah: { hotel: "Dallah Taibah", distance: "270 MTR" },
    prices: { quint: 458682, quad: 504767, triple: 564816, double: 682521 },
  },
  {
    id: "15-safar",
    originalTier: "Bronze",
    name: "SAFAR",
    tagline: "A Journey of Faith",
    duration: 15,
    makkah: { hotel: "Hidaya Tower", distance: "Shuttle" },
    madinah: { hotel: "Ritaj Al Madinah", distance: "Shuttle" },
    prices: { quint: 225189, quad: 231665, triple: 242777, double: 260498 },
  },
  {
    id: "15-noor",
    originalTier: "Silver",
    name: "NOOR",
    tagline: "A Journey Illuminated",
    duration: 15,
    makkah: { hotel: "Fundaq Bilal", distance: "Shuttle" },
    madinah: { hotel: "Ritaj Al Madinah", distance: "Shuttle" },
    prices: { quint: 227102, quad: 234245, triple: 245916, double: 265167 },
  },
  {
    id: "15-sukoon",
    originalTier: "Golden",
    name: "SUKOON",
    tagline: "A Journey of Serenity",
    duration: 15,
    makkah: { hotel: "Land Premium", distance: "1000 MTR" },
    madinah: { hotel: "Shaza Muwannara", distance: "850 MTR" },
    prices: { quint: 244241, quad: 255667, triple: 278814, double: 308012 },
  },
  {
    id: "15-barakah",
    originalTier: "Platinum",
    name: "BARAKAH",
    tagline: "A Journey Blessed",
    duration: 15,
    makkah: { hotel: "Jowhra Majid", distance: "750 MTR" },
    madinah: { hotel: "Diyar Al Aws", distance: "450 MTR" },
    prices: { quint: 249774, quad: 262584, triple: 283136, double: 321846 },
  },
  {
    id: "15-rahat",
    originalTier: "Diamond",
    name: "RAHAT",
    tagline: "A Journey of Comfort",
    duration: 15,
    makkah: { hotel: "Mather Al Jawwar", distance: "550 MTR" },
    madinah: { hotel: "Bir Al Eiman", distance: "350 MTR" },
    prices: { quint: 264376, quad: 307062, triple: 342440, double: 410134 },
  },
  {
    id: "15-manzil",
    originalTier: "Royal",
    name: "MANZIL",
    tagline: "A Journey Beyond",
    duration: 15,
    makkah: { hotel: "Voco", distance: "Shuttle" },
    madinah: { hotel: "Artal Intl", distance: "350 MTR" },
    prices: { quint: 267772, quad: 318899, triple: 350136, double: 350056 },
  },
  {
    id: "15-rehmat",
    originalTier: "Elite",
    name: "REHMAT",
    tagline: "A Journey of Blessings",
    duration: 15,
    makkah: { hotel: "Zilal Al Zulzula", distance: "350 MTR" },
    madinah: { hotel: "Taif Nabras", distance: "200 MTR" },
    prices: { quint: 270354, quad: 290304, triple: 328096, double: 377886 },
  },
  {
    id: "15-haramain",
    originalTier: "VIP",
    name: "HARAMAIN",
    tagline: "Closer to the Sacred",
    duration: 15,
    makkah: { hotel: "Nawarat Ul Shams 3", distance: "300 MTR" },
    madinah: { hotel: "Plaza Unhood", distance: "300 MTR" },
    prices: { quint: 279617, quad: 290880, triple: 375864, double: 396438 },
  },
  {
    id: "15-aafiyat",
    originalTier: "Prestige",
    name: "AAFIYAT",
    tagline: "A Journey in Comfort",
    duration: 15,
    makkah: { hotel: "Le Meridien", distance: "Shuttle" },
    madinah: { hotel: "Grand Zawar", distance: "250 MTR" },
    prices: { quint: 287194, quad: 283097, triple: 343820, double: 350056 },
  },
  {
    id: "15-maqam",
    originalTier: "Signature",
    name: "MAQAM",
    tagline: "The Ultimate Journey",
    duration: 15,
    makkah: { hotel: "Makkah Tower", distance: "250 MTR" },
    madinah: { hotel: "Dallah Taibah", distance: "270 MTR" },
    prices: { quint: 310602, quad: 305849, triple: 477056, double: 680016 },
  },
];
