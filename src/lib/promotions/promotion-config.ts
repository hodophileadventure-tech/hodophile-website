import type { PromotionDefinition } from "./promotion-types";

export const PROMOTIONS: Record<string, PromotionDefinition> = {
  HODOSB10: {
    code: "HODOSB10",
    discountType: "percentage",
    discountPercent: 10,
    eligibleTourIds: ["skardu-basho-6days", "skardu-deosai-basho-air-5-days"],
    active: true,
  },
  HODOHS10: {
    code: "HODOHS10",
    discountType: "percentage",
    discountPercent: 10,
    eligibleTourIds: ["skardu-hunza-8days", "skardu-hunza-air-7-days"],
    active: true,
  },
  HODOSK10: {
    code: "HODOSK10",
    discountType: "percentage",
    discountPercent: 10,
    eligibleTourIds: ["skardu-khaplu-deosai-basho-air-7-days"],
    active: true,
  },
};