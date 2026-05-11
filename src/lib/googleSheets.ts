interface QuotationRecord {
  timestamp: string;
  customerName: string;
  customerPhone: string;
  startingPoint: string;
  tripDate: string;
  routeId: string;
  route: string;
  destination: string;
  destinationCity: string;
  routeDurationDays: number;
  routeDirection: string;
  routeItinerary: string;
  vehicle: string;
  hotel: string;
  hotelCategory: string;
  roomType: string;
  numberOfRooms: number;
  adults: number;
  kids: number;
  kidsAges: string[];
  tourType: string;
  travelMode?: string;
  isMultiCity: boolean;
  multiCityHotels?: Record<string, { hotelId: string; roomId: string }>;
  multiCityNights?: Record<string, number>;
  singleCityHotelStays?: Array<{ hotelId: string; roomId: string; nights: number }>;
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
    const sheetUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      process.env.GOOGLE_APPS_SCRIPT_URL ||
      process.env.GOOGLE_QUOTATION_SCRIPT_URL;
    
    if (!sheetUrl) {
      console.warn("No Google Sheets webhook configured - skipping quotation save");
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
        dataWithTimestamp.routeId,
        dataWithTimestamp.route,
        dataWithTimestamp.destination,
        dataWithTimestamp.destinationCity,
        dataWithTimestamp.routeDurationDays,
        dataWithTimestamp.routeDirection,
        dataWithTimestamp.routeItinerary,
        dataWithTimestamp.vehicle,
        dataWithTimestamp.hotel,
        dataWithTimestamp.hotelCategory,
        dataWithTimestamp.roomType,
        dataWithTimestamp.numberOfRooms,
        dataWithTimestamp.adults,
        dataWithTimestamp.kids,
        dataWithTimestamp.kidsAges.join(", "),
        dataWithTimestamp.tourType,
        dataWithTimestamp.travelMode || "road",
        dataWithTimestamp.isMultiCity ? "Yes" : "No",
        JSON.stringify(dataWithTimestamp.multiCityHotels || {}),
        JSON.stringify(dataWithTimestamp.multiCityNights || {}),
        JSON.stringify(dataWithTimestamp.singleCityHotelStays || []),
        dataWithTimestamp.transportCost,
        dataWithTimestamp.hotelCost,
        dataWithTimestamp.jeepAddonsCost,
        dataWithTimestamp.subtotal,
        dataWithTimestamp.markupAmount,
        dataWithTimestamp.totalCost,
        dataWithTimestamp.perPersonCost,
      ],
    ];

    // Send a compatible payload for both Apps Script and generic webhooks.
    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "addQuotation",
        data: dataWithTimestamp,
        values,
        fields: [
          "Timestamp",
          "Customer Name",
          "Phone",
          "Starting Point",
          "Trip Date",
          "Route ID",
          "Route",
          "Destination",
          "Destination City",
          "Route Duration (Days)",
          "Route Direction",
          "Route Itinerary",
          "Vehicle",
          "Hotel",
          "Hotel Category",
          "Room Type",
          "Rooms",
          "Adults",
          "Kids",
          "Kids Ages",
          "Tour Type",
          "Tour Mode",
          "Is Multi-City",
          "Multi-City Hotels",
          "Multi-City Nights",
          "Single-City Hotel Stays",
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
