import { Suspense } from "react";
import { QuotationResultContent } from "@/components/quotation-result-content";

export default function QuotationResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center"><div className="text-stone-600">Loading quotation...</div></div>}>
      <QuotationResultContent />
    </Suspense>
  );
}
