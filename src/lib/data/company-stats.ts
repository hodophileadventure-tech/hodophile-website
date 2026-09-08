export type CompanyStat = {
  key: string;
  value: string;
  label: string;
  requiresVerification?: boolean;
};

export const companyStats: CompanyStat[] = [
  { key: "founded", value: "2021", label: "Founded", requiresVerification: true },
  { key: "travelers", value: "8,750", label: "Happy Travelers", requiresVerification: true },
  { key: "tours", value: "280", label: "Tours Conducted", requiresVerification: true },
  { key: "destinations", value: "180", label: "Destinations Covered", requiresVerification: true },
  { key: "rating", value: "4.9★", label: "Customer Rating", requiresVerification: true },
  { key: "support", value: "24/7", label: "Customer Support", requiresVerification: true },
];
