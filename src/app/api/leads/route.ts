import { NextRequest, NextResponse } from 'next/server';

// Use the configured Google Apps Script URL for all lead submissions
const GOOGLE_LEADS_SCRIPT_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL ||
  process.env.GOOGLE_LEADS_SCRIPT_URL ||
  '';

interface LeadData {
  name: string;
  email: string;
  whatsapp: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadData;

    // Validate input
    if (!body.name || !body.email || !body.whatsapp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if URL is configured
    if (!GOOGLE_LEADS_SCRIPT_URL) {
      console.error('Lead script URL is not configured on the server');
      return NextResponse.json(
        { error: 'Lead script URL is not configured on the server' },
        { status: 500 }
      );
    }

    // Send to Google Apps Script with proper format
    const response = await fetch(GOOGLE_LEADS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addLead',
        data: {
          name: body.name,
          email: body.email,
          whatsapp: body.whatsapp,
          timestamp: body.timestamp,
          source: 'lead-capture-popup',
        },
      }),
    });

    const responseText = await response.text();
    if (!response.ok) {
      // Try to parse error details from Google Apps Script
      let errorDetails = responseText;
      try {
        const errorJson = JSON.parse(responseText);
        errorDetails = errorJson.error || errorJson.message || responseText;
      } catch {
        errorDetails = responseText || `HTTP ${response.status}`;
      }
      throw new Error(`Google Apps Script error: ${errorDetails}`);
    }

    // Parse the successful response (body already read as text)
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { success: true, message: 'Lead processed' };
    }
    if (result && result.success === false) {
      throw new Error('Lead service rejected the submission');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead captured successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);

    return NextResponse.json(
      {
        error: 'Failed to process lead',
        details: 'Please try again later.',
      },
      { status: 500 }
    );
  }
}
