export type PromotionSummary = {
  code: string;
  discountPercent: number;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
};

export type PromoValidationResult =
  | ({ valid: true } & PromotionSummary)
  | { valid: false; error: string };

export type PromotionDefinition = {
  code: string;
  discountType: "percentage";
  discountPercent: number;
  eligibleTourIds: readonly string[];
  active: boolean;
  startsAt?: string;
  endsAt?: string;
};