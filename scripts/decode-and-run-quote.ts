import { calculateQuotation, formatPKR } from "../src/lib/pricingEngine";

const dataArg = process.argv[2] || "eyJ0cmlwRGF0ZSI6IjIwMjYtMDUtMjgiLCJzdGFydGluZ1BvaW50IjoiSXNsYW1hYmFkIiwicm91dGVJZCI6ImN1c3RvbS1pdGluZXJhcnkiLCJkZXN0aW5hdGlvbiI6Ikh1bnphICsgU2thcmR1ICsgQ2hpbGFzIChBcnJpdmFsKSArIENoaWxhcyAoUmV0dXJuKSIsImhvdGVsSWQiOiIiLCJyb29tVHlwZSI6Ik11bHRpcGxlIiwidmVoaWNsZU5hbWUiOiJUb3lvdGEgQ29yb2xsYSIsIm51bWJlck9mUm9vbXMiOjEsImFkdWx0cyI6Miwia2lkcyI6MCwia2lkc0FnZXMiOltdLCJob3RlbENhdGVnb3J5Ijoic3RhbmRhcmQiLCJ0b3VyVHlwZSI6InByaXZhdGUiLCJ0cmFuc3BvcnRDb3N0IjoyMTcxOTMsImhvdGVsQ29zdCI6ODAwMDAsImplZXBBZGRvbnNDb3N0IjoyNTAwMCwic3VidG90YWwiOjMyMjE5MywibWFya3VwQW1vdW50Ijo3MDg4MiwidG90YWxDb3N0IjozOTMwNzUsInBlclBlcnNvbkNvc3QiOjE5NjUzOCwib2ZmUm91dGVDaGFyZ2VQS1IiOjAsImlzSW52YWxpZENvbWJpbmF0aW9uIjpmYWxzZSwidHJhdmVsTW9kZSI6InJvYWQiLCJtdWx0aUNpdHlIb3RlbHMiOnsiSHVuemEiOnsiaG90ZWxJZCI6Imh1bnphLWJsaXNzLWh1bnphIiwicm9vbUlkIjoiU3RhbmRhcmQgUm9vbSAoMSBNYXN0ZXIgKyAxIFNvZmEgQmVkKSJ9LCJTa2FyZHUiOnsiaG90ZWxJZCI6ImFiYmFzaGFoLWhvdGVsLXNrYXJkdSIsInJvb21JZCI6IlN0YW5kYXJkIn0sIkNoaWxhcyAoQXJyaXZhbCkiOnsiaG90ZWxJZCI6InN1bi1yaXNlLWhvdGVsLWNoaWxhcyIsInJvb21JZCI6IlN0YW5kYXJkIFJvb20ifSwiQ2hpbGFzIChSZXR1cm4pIjp7ImhvdGVsSWQiOiJzdW4tcmlzZS1ob3RlbC1jaGlsYXMiLCJyb29tSWQiOiJTdGFuZGFyZCBSb29tIn19LCJtdWx0aUNpdHlOaWdodHMiOnsiSHVuemEiOjUsIlNrYXJkdSI6NiwiQ2hpbGFzIChBcnJpdmFsKSI6MSwiQ2hpbGFzIChSZXR1cm4pIjoxfSwiY3VzdG9tQ2l0aWVzIjpbIkh1bnphIiwiU2thcmR1IiwiQ2hpbGFzIChBcnJpdmFsKSIsIkNoaWxhcyAoUmV0dXJuKSJdLCJjdXN0b21Sb3V0ZUxhYmVsIjoiSHVuemEgKyBTa2FyZHUgKyBDaGlsYXMgKEFycml2YWwpICsgQ2hpbGFzIChSZXR1cm4pIiwiY3VzdG9tZXJOYW1lIjoiUkF6YSIsImN1c3RvbWVyUGhvbmUiOiIwMzQ0NDQ0NDQ0NCIsImRlc2NyaXB0aW9uIjoiSHVuemEgKyBTa2FyZHUgKyBDaGlsYXMgKEFycml2YWwpICsgQ2hpbGFzIChSZXR1cm4pIHwgVmVoaWNsZTogVG95b3RhIENvcm9sbGEgfCBIb3RlbHM6IENoaWxhcyAoQXJyaXZhbCk6IFN1biBSaXNlIEhvdGVsIENoaWxhcyAoMSBuaWdodHMpIC8gQ2hpbGFzIChSZXR1cm4pOiBTdW4gUmlzZSBIb3RlbCBDaGlsYXMgKDEgbmlnaHRzKSB8IFRvdGFsOiBQS1IgMzkzLDA3NSB8IFBlciBwZXJzb246IFBLUiAxOTYsNTM4Iiwic2luZ2xlQ2l0eUhvdGVsU3RheXMiOltdfQ==";

try {
  const jsonStr = Buffer.from(dataArg, "base64").toString("utf8");
  const parsed = JSON.parse(jsonStr);
  console.log("Decoded input:\n", JSON.stringify(parsed, null, 2));

  const quotation = calculateQuotation(parsed as any);
  console.log("\nCalculated quotation:\n", JSON.stringify(quotation, null, 2));

  if (!quotation) {
    console.error("Quotation calculation returned null");
    process.exit(1);
  }

  const tb = quotation.transportBreakdown;
  if (tb) {
    console.log("\nTransport breakdown:");
    console.log(`Fuel: ${formatPKR(tb.fuelCost)} (${Math.round(tb.fuelNeeded)}L @ per L)`);
    console.log(`Rental: ${formatPKR(tb.rentalCost)} (${tb.vehicleDays} days @ ${formatPKR(tb.dailyRate)})`);
    console.log(`Toll/Tax: ${formatPKR(tb.tollTax)}`);
    console.log(`Total transport (sum): ${formatPKR(tb.fuelCost + tb.rentalCost + tb.tollTax)}`);
  } else {
    console.log("No transport breakdown available; transportCost:", formatPKR(quotation.transportCost));
  }
} catch (e) {
  console.error("Error decoding or calculating quotation:", e);
  process.exit(1);
}
