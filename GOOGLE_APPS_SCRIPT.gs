/**
 * Google Apps Script for Hodophile Lead Capture System
 * 
 * Setup Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Copy this entire code into the script editor
 * 4. Replace "YOUR_SPREADSHEET_ID" below with your actual spreadsheet ID
 * 5. Deploy as web app:
 *    - Click Deploy > New Deployment
 *    - Select type: Web app
 *    - Execute as: Your account
 *    - Who has access: Anyone
 * 6. Copy the deployment URL and set it as GOOGLE_APPS_SCRIPT_URL in your .env.local
 * 
 * Your spreadsheet should have headers in the first row:
 * Name | Email | WhatsApp | Timestamp | Source
 */

// CONFIGURATION: Replace with your actual spreadsheet ID
const SPREADSHEET_ID = '1TZea-g_bZKQ2Dmfh_q53oSkVEvpeF8asyhb_XF8Rt1k';
const SHEET_NAME = 'Leads'; // Name of the sheet where data will be stored
const QUOTATIONS_SHEET_NAME = 'Quotations';

/**
 * Main handler for POST requests
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.action === 'addLead') {
      const result = addLeadToSheet(payload.data);
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (payload.action === 'addQuotation') {
      const result = addQuotationToSheet(payload.data);
      return ContentService.createTextOutput(
        JSON.stringify(result)
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: 'Unknown action' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Add a quotation lead to the Google Sheet
 */
function addQuotationToSheet(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(QUOTATIONS_SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(QUOTATIONS_SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'Customer Name',
        'Phone',
        'Starting Point',
        'Trip Date',
        'Route ID',
        'Route',
        'Destination',
        'Destination City',
        'Route Duration (Days)',
        'Route Direction',
        'Route Itinerary',
        'Vehicle',
        'Hotel',
        'Hotel Category',
        'Room Type',
        'Rooms',
        'Adults',
        'Kids',
        'Kids Ages',
        'Tour Type',
        'Is Multi-City',
        'Multi-City Hotels',
        'Multi-City Nights',
        'Transport Cost',
        'Hotel Cost',
        'Jeep Addons Cost',
        'Subtotal',
        'Markup',
        'Total Cost',
        'Per Person Cost',
      ]);
    }

    const row = [
      data.timestamp || new Date().toISOString(),
      data.customerName || '',
      data.customerPhone || '',
      data.startingPoint || '',
      data.tripDate || '',
      data.routeId || '',
      data.route || '',
      data.destination || '',
      data.destinationCity || '',
      data.routeDurationDays || 0,
      data.routeDirection || '',
      data.routeItinerary || '',
      data.vehicle || '',
      data.hotel || '',
      data.hotelCategory || '',
      data.roomType || '',
      data.numberOfRooms || 0,
      data.adults || 0,
      data.kids || 0,
      Array.isArray(data.kidsAges) ? data.kidsAges.join(', ') : '',
      data.tourType || '',
      data.isMultiCity ? 'Yes' : 'No',
      JSON.stringify(data.multiCityHotels || {}),
      JSON.stringify(data.multiCityNights || {}),
      data.transportCost || 0,
      data.hotelCost || 0,
      data.jeepAddonsCost || 0,
      data.subtotal || 0,
      data.markupAmount || 0,
      data.totalCost || 0,
      data.perPersonCost || 0,
    ];

    sheet.appendRow(row);

    return {
      success: true,
      message: 'Quotation added successfully',
      rowNumber: sheet.getLastRow(),
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString(),
    };
  }
}

/**
 * Add a lead to the Google Sheet
 */
function addLeadToSheet(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      // Create sheet if it doesn't exist
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      newSheet.appendRow([
        'Name',
        'Email',
        'WhatsApp',
        'Timestamp',
        'Source',
      ]);
      return addLeadToSheet(data); // Recursively call to add the data
    }

    // Check for duplicate entries (same email or whatsapp within last 5 minutes)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const dataRange = sheet.getRange(Math.max(1, lastRow - 50), 1, Math.min(50, lastRow), 5);
      const values = dataRange.getValues();
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

      for (let i = values.length - 1; i >= 0; i--) {
        const row = values[i];
        const rowEmail = row[1];
        const rowWhatsapp = row[2];
        const rowTimestamp = new Date(row[3]);

        if (
          rowTimestamp > fiveMinutesAgo &&
          (rowEmail === data.email || rowWhatsapp === data.whatsapp)
        ) {
          return {
            success: false,
            error: 'Duplicate submission detected. Please try again later.',
          };
        }
      }
    }

    // Add new row
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.whatsapp || '',
      data.timestamp || new Date().toISOString(),
      data.source || 'unknown',
    ]);

    // Format timestamp column if it's the first entry
    if (lastRow === 1) {
      const timestampColumn = 4;
      sheet.getRange(2, timestampColumn, sheet.getLastRow() - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    }

    return {
      success: true,
      message: 'Lead added successfully',
      rowNumber: sheet.getLastRow(),
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString(),
    };
  }
}

/**
 * Test function to check if the script is working
 * Run this from the Apps Script editor to test
 */
function testAddLead() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    whatsapp: '+923001234567',
    timestamp: new Date().toISOString(),
    source: 'test',
  };

  const result = addLeadToSheet(testData);
  Logger.log('Test Result:', result);
}

/**
 * Optional: Get all leads (for dashboard purposes)
 */
function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Sheet not found' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const data = sheet.getDataRange().getValues();
    const leads = [];

    // Skip header row
    for (let i = 1; i < data.length; i++) {
      leads.push({
        name: data[i][0],
        email: data[i][1],
        whatsapp: data[i][2],
        timestamp: data[i][3],
        source: data[i][4],
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        count: leads.length,
        leads: leads,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
