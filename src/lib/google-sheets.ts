import { google } from "googleapis";

const sheets = google.sheets("v4");

export interface QuotationRow {
  timestamp: string;
  customerName: string;
  customerPhone: string;
  startingPoint: string;
  tripDate: string;
  route: string;
  hotel: string;
  roomType: string;
  vehicle: string;
  adults: number;
  kids: number;
  numberOfRooms: number;
  tourType: string;
  hotelCost: number;
  transportCost: number;
  subtotal: number;
  markup: number;
  totalCost: number;
}

async function getAuthClient() {
  const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || "{}");
  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return auth.getClient();
}

export async function saveQuotationToSheets(data: QuotationRow): Promise<boolean> {
  try {
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      console.warn("GOOGLE_SHEETS_SPREADSHEET_ID not configured");
      return false;
    }

    if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
      console.warn("GOOGLE_SHEETS_CREDENTIALS not configured");
      return false;
    }

    const auth = await getAuthClient();

    const values = [
      [
        data.timestamp,
        data.customerName,
        data.customerPhone,
        data.startingPoint,
        data.tripDate,
        data.route,
        data.hotel,
        data.roomType,
        data.vehicle,
        data.adults,
        data.kids,
        data.numberOfRooms,
        data.tourType,
        data.hotelCost,
        data.transportCost,
        data.subtotal,
        data.markup,
        data.totalCost,
      ],
    ];

    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet1!A:R",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    console.log("✓ Quotation saved to Google Sheets");
    return true;
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return false;
  }
}
