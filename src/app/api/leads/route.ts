import { NextRequest, NextResponse } from 'next/server';

// Replace with your Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || '';

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

    // If no Google Apps Script URL is configured, just return success (for development)
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.warn('GOOGLE_APPS_SCRIPT_URL not configured. Lead data would be:');
      console.log(body);

      return NextResponse.json(
        {
          success: true,
          message: 'Lead captured (Google Sheets integration not configured)',
          data: body,
        },
        { status: 201 }
      );
    }

    // Send to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
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

    if (!response.ok) {
      throw new Error(`Google Apps Script returned status ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: 'Lead captured successfully',
        data: body,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);

    return NextResponse.json(
      {
        error: 'Failed to process lead',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
