import { NextRequest, NextResponse } from "next/server";

const GOOGLE_MIQAT_LEADS_SCRIPT_URL =
  process.env.GOOGLE_MIQAT_LEADS_SCRIPT_URL ||
  process.env.GOOGLE_APPS_SCRIPT_URL ||
  process.env.GOOGLE_LEADS_SCRIPT_URL ||
  "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = ["name", "phone", "startDate", "endDate", "adults"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    if (!GOOGLE_MIQAT_LEADS_SCRIPT_URL) {
      console.error("MIQAT lead script URL is not configured on the server");
      return NextResponse.json(
        { error: "MIQAT lead script URL is not configured on the server" },
        { status: 500 }
      );
    }

    const payload = {
      action: "addLead",
      data: {
        ...body,
        timestamp: new Date().toISOString(),
        source: "miqat-booking",
      },
    };

    const response = await fetch(GOOGLE_MIQAT_LEADS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("MIQAT sheet response status:", response.status);
    console.log("MIQAT sheet response text:", responseText);

    if (!response.ok) {
      let errorDetails = responseText;
      try {
        const json = JSON.parse(responseText);
        errorDetails = json.error || json.message || responseText;
      } catch {
        errorDetails = responseText || `HTTP ${response.status}`;
      }
      return NextResponse.json({ error: `Google Sheet error: ${errorDetails}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "MIQAT lead submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error submitting MIQAT lead:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
