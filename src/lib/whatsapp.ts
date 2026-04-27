import type { QuotationBreakdown } from "./pricingEngine";
import { formatPKR } from "./pricingEngine";

export interface WhatsAppMessage {
  customerName: string;
  customerPhone: string;
  quotation: QuotationBreakdown;
}

export function formatQuotationForWhatsApp(msg: WhatsAppMessage): string {
  const { customerName, customerPhone, quotation } = msg;
  const { details } = quotation;

  const message = `
🧳 *New Travel Quotation Request* 🧳

*Customer Details:*
📝 Name: ${customerName}
📞 Phone: ${customerPhone}

*Trip Details:*
🗺️ Route: ${details.route}
🚗 Vehicle: ${details.vehicle}
🏨 Hotel: ${details.hotel}
🛏️ Room Type: ${details.roomType}
🔢 Number of Rooms: ${details.numberOfRooms}
👥 Number of Guests: ${details.numberOfGuests}

*Cost Breakdown:*
🚗 Transport: ${formatPKR(quotation.transportCost)}
🏨 Hotel (${details.numberOfRooms} rooms): ${formatPKR(quotation.hotelCost)}
${quotation.jeepAddonsCost > 0 ? `🏔️ Jeep Add-ons: ${formatPKR(quotation.jeepAddonsCost)}\n` : ""}
*Total: ${formatPKR(quotation.totalCost)}*
💰 Per Person: ${formatPKR(quotation.perPersonCost)}

---
Message from Hodophile Website
  `.trim();

  return message;
}

/**
 * Send WhatsApp message via Twilio or other WhatsApp API
 * This is a template - integrate with your WhatsApp Business API
 */
export async function sendWhatsAppNotification(
  msg: WhatsAppMessage
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const message = formatQuotationForWhatsApp(msg);
    const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;
    const apiToken = process.env.WHATSAPP_API_TOKEN;

    if (!adminPhone || !apiToken) {
      console.error("WhatsApp credentials not configured");
      return {
        success: false,
        error: "WhatsApp not configured",
      };
    }

    // Example with Twilio-like API
    const response = await fetch("https://api.twilio.com/2010-04-01/Accounts/{AccountSID}/Messages.json", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: `whatsapp:${adminPhone}`,
        From: `whatsapp:${process.env.WHATSAPP_FROM_NUMBER || ""}`,
        Body: message,
      }).toString(),
    });

    if (response.ok) {
      const data = await response.json() as { sid?: string };
      return {
        success: true,
        messageId: data.sid,
      };
    }

    return {
      success: false,
      error: `API Error: ${response.statusText}`,
    };
  } catch (error) {
    console.error("WhatsApp error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Log quotation to console for now (fallback when API not available)
 */
export function logQuotationNotification(msg: WhatsAppMessage): void {
  const message = formatQuotationForWhatsApp(msg);
  console.log("\n=== QUOTATION NOTIFICATION ===");
  console.log(message);
  console.log("\n");
}
