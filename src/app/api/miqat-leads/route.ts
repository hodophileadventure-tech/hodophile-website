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
    if (!response.ok) {
      console.error("MIQAT lead service failed:", response.status);
      return NextResponse.json({ error: "Unable to submit the MIQAT request." }, { status: 500 });
    }

    try {
      const result = JSON.parse(responseText);
      if (result?.success === false) {
        return NextResponse.json({ error: "Unable to submit the MIQAT request." }, { status: 502 });
      }
    } catch {
      // Some Apps Script deployments return an empty or non-JSON success body.
    }

    return NextResponse.json({ success: true, message: "MIQAT lead submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error submitting MIQAT lead:", error);
    return NextResponse.json(
      { error: "Unable to submit the MIQAT request." },
      { status: 500 }
    );
  }
}
