import type { QuotationBreakdown } from "./pricingEngine";

interface QuotationRecord {
  timestamp: string;
  customerName: string;
  customerPhone: string;
  startingPoint: string;
  tripDate: string;
  route: string;
  destination: string;
  vehicle: string;
  hotel: string;
  roomType: string;
  numberOfRooms: number;
  adults: number;
  kids: number;
  tourType: string;
  transportCost: number;
  hotelCost: number;
  jeepAddonsCost: number;
  subtotal: number;
  markupAmount: number;
  totalCost: number;
  perPersonCost: number;
}

export async function saveQuotationToSheet(
  record: Omit<QuotationRecord, "timestamp">
) {
  try {
    const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    
    if (!sheetUrl) {
      console.warn("GOOGLE_SHEET_WEBHOOK_URL not configured - skipping sheet save");
      return { success: false, error: "Sheet URL not configured" };
    }

    const dataWithTimestamp: QuotationRecord = {
      ...record,
      timestamp: new Date().toISOString(),
    };

    // Convert to array format for Google Sheets
    const values = [
      [
        dataWithTimestamp.timestamp,
        dataWithTimestamp.customerName,
        dataWithTimestamp.customerPhone,
        dataWithTimestamp.startingPoint,
        dataWithTimestamp.tripDate,
        dataWithTimestamp.route,
        dataWithTimestamp.destination,
        dataWithTimestamp.vehicle,
        dataWithTimestamp.hotel,
        dataWithTimestamp.roomType,
        dataWithTimestamp.numberOfRooms,
        dataWithTimestamp.adults,
        dataWithTimestamp.kids,
        dataWithTimestamp.tourType,
        dataWithTimestamp.transportCost,
        dataWithTimestamp.hotelCost,
        dataWithTimestamp.jeepAddonsCost,
        dataWithTimestamp.subtotal,
        dataWithTimestamp.markupAmount,
        dataWithTimestamp.totalCost,
        dataWithTimestamp.perPersonCost,
      ],
    ];

    // Send to webhook (AppSheet, Make.com, or Zapier)
    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        values,
        fields: [
          "Timestamp",
          "Customer Name",
          "Phone",
          "Starting Point",
          "Trip Date",
          "Route",
          "Destination",
          "Vehicle",
          "Hotel",
          "Room Type",
          "Rooms",
          "Adults",
          "Kids",
          "Tour Type",
          "Transport Cost",
          "Hotel Cost",
          "Jeep Addons Cost",
          "Subtotal",
          "Markup",
          "Total Cost",
          "Per Person Cost",
        ],
      }),
    });

    if (!response.ok) {
      console.error("Failed to save to sheet:", response.statusText);
      return { success: false, error: response.statusText };
    }

    console.log("Quotation saved to Google Sheet");
    return { success: true };
  } catch (error) {
    console.error("Error saving to sheet:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
