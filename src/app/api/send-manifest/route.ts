import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { translations } from "@/lib/translations";
import type { Locale } from "@/lib/types";

interface SendManifestBody {
  locale: Locale;
  boatName: string;
  departureDate: string;
  passengers: Array<{
    fullName: string;
    documentType: string;
    documentNumber: string;
  }>;
  plainTextList: string;
  pdfBase64: string;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const patronEmail = process.env.PATRON_EMAIL;
    const officeEmail = process.env.OFFICE_EMAIL;

    if (!apiKey || !fromEmail || !patronEmail) {
      return NextResponse.json(
        {
          error:
            "Missing email configuration. Set RESEND_API_KEY, RESEND_FROM_EMAIL and PATRON_EMAIL in .env.local",
        },
        { status: 500 },
      );
    }

    const body: SendManifestBody = await request.json();
    const { locale, boatName, departureDate, plainTextList, pdfBase64 } = body;
    const t = translations[locale] ?? translations.es;

    const resend = new Resend(apiKey);
    const recipients = officeEmail
      ? [patronEmail, officeEmail]
      : [patronEmail];
    const fileName = `manifest-${boatName.replace(/\s+/g, "-").toLowerCase()}-${departureDate}.pdf`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px;">
        <h2 style="color: #0f172a;">Náutica Elite — ${t.pdfTitle}</h2>
        <p>${t.emailIntro}</p>
        <p><strong>${t.pdfBoat}:</strong> ${boatName}<br/>
        <strong>${t.pdfDate}:</strong> ${departureDate}</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p><strong>${t.emailPassengerList}</strong></p>
        <pre style="background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${plainTextList}</pre>
        <p style="color: #64748b; font-size: 13px;">${t.emailCopyHint}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-manifest error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
