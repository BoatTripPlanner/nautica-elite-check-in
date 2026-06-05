import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { translations } from "@/lib/translations";
import { escapeHtml, validateManifestPayload } from "@/lib/validation";
import { buildPlainTextPassengerList } from "@/lib/generatePdf";
import type { Locale } from "@/lib/types";

const MAX_BODY_BYTES = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const patronEmail = process.env.PATRON_EMAIL;
    const officeEmail = process.env.OFFICE_EMAIL;

    if (!apiKey || !fromEmail || !patronEmail) {
      console.error("send-manifest: missing email configuration");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const validation = validateManifestPayload({
      locale: String(payload.locale ?? ""),
      boatId: String(payload.boatId ?? ""),
      boatName: String(payload.boatName ?? ""),
      departureDate: String(payload.departureDate ?? ""),
      passengers: Array.isArray(payload.passengers)
        ? (payload.passengers as Array<{
            fullName: string;
            documentType: string;
            documentNumber: string;
          }>)
        : [],
      pdfBase64:
        typeof payload.pdfBase64 === "string" ? payload.pdfBase64 : "",
    });

    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.message },
        { status: validation.status },
      );
    }

    const { boat } = validation;
    const boatName = boat.name;
    const boatId = String(payload.boatId ?? "");

    const locale = payload.locale as Locale;
    const departureDate = String(payload.departureDate ?? "");
    const passengers = payload.passengers as Array<{
      fullName: string;
      documentType: string;
      documentNumber: string;
    }>;
    const pdfBase64 = String(payload.pdfBase64 ?? "");
    const t = translations[locale] ?? translations.es;
    const plainTextList = buildPlainTextPassengerList(locale, passengers);

    const resend = new Resend(apiKey);
    const recipients = officeEmail
      ? [patronEmail, officeEmail]
      : [patronEmail];
    const safeBoatName = escapeHtml(boatName);
    const safeDate = escapeHtml(departureDate);
    const safePlainText = escapeHtml(plainTextList);
    const fileName = `manifest-${boatName.replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/gi, "")}-${departureDate}.pdf`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px;">
        <h2 style="color: #0f172a;">Náutica Elite — ${escapeHtml(t.pdfTitle)}</h2>
        <p>${escapeHtml(t.emailIntro)}</p>
        <p><strong>${escapeHtml(t.pdfBoat)}:</strong> ${safeBoatName}<br/>
        <strong>${escapeHtml(t.pdfDate)}:</strong> ${safeDate}</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p><strong>${escapeHtml(t.emailPassengerList)}</strong></p>
        <pre style="background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safePlainText}</pre>
        <p style="color: #64748b; font-size: 13px;">${escapeHtml(t.emailCopyHint)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail.replace(/Náutica/g, "Nautica"),
      to: recipients,
      subject: `${t.emailSubject} — ${boatName} (${departureDate})`,
      html: htmlBody,
      attachments: [
        {
          filename: fileName,
          content: pdfBase64,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-manifest error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
