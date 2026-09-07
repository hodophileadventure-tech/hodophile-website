import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEET_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbyqv313jBDuzZbpCsKtvERXOASPawy9zGr8ZSFdf8a0l1-xPDUBa21g9ruJLH-gDkJv9w/exec";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as ContactFormData;

    // Validate data
    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Transform contact form data to lead format for Google Apps Script
    // The contact form has a message field, so we'll store the phone as whatsapp
    const leadData = {
      action: "addLead",
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.phone,
        timestamp: new Date().toISOString(),
        source: "contact-form",
        message: data.message, // Include message for reference
      },
    };

    // Send to Google Apps Script
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      console.error("Google Sheet contact submission failed:", response.status);
      return NextResponse.json(
        { error: `Google Sheet returned ${response.status}` },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
