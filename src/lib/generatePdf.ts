import { jsPDF } from "jspdf";
import type { Locale } from "./types";
import { getDocumentTypeLabel, translations } from "./translations";

interface PdfPassenger {
  fullName: string;
  documentType: string;
  documentNumber: string;
}

interface GeneratePdfOptions {
  locale: Locale;
  boatName: string;
  departureDate: string;
  passengers: PdfPassenger[];
}

const NAVY = [15, 23, 42] as const;
const NAVY_LIGHT = [30, 58, 95] as const;
const SLATE = [100, 116, 139] as const;

export function generateManifestPdf({
  locale,
  boatName,
  departureDate,
  passengers,
}: GeneratePdfOptions): jsPDF {
  const t = translations[locale];
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  let y = 0;

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageWidth, 38, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("NÁUTICA ELITE", margin, 16);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(t.pdfTitle, margin, 26);

  y = 50;
  doc.setTextColor(...NAVY);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`${t.pdfBoat}:`, margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(boatName, margin + 32, y);

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text(`${t.pdfDate}:`, margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(formatDate(departureDate, locale), margin + 32, y);

  y += 14;
  const colWidths = [70, 40, 52];
  const colX = [margin, margin + colWidths[0], margin + colWidths[0] + colWidths[1]];

  doc.setFillColor(...NAVY_LIGHT);
  doc.rect(margin, y - 5, pageWidth - margin * 2, 9, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(t.pdfColName, colX[0] + 2, y);
  doc.text(t.pdfColDocType, colX[1] + 2, y);
  doc.text(t.pdfColDocNumber, colX[2] + 2, y);

  y += 8;
  doc.setTextColor(30, 41, 59);
  doc.setFont("helvetica", "normal");

  passengers.forEach((passenger, index) => {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y - 4, pageWidth - margin * 2, 8, "F");
    }

    doc.setFontSize(9);
    doc.text(passenger.fullName, colX[0] + 2, y);
    doc.text(
      getDocumentTypeLabel(locale, passenger.documentType),
      colX[1] + 2,
      y,
    );
    doc.text(passenger.documentNumber, colX[2] + 2, y);
    y += 8;
  });

  y += 10;
  doc.setDrawColor(...SLATE);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(7);
  doc.setTextColor(...SLATE);
  doc.setFont("helvetica", "bold");
  doc.text(t.pdfFooterLabel, margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  const gdprLines = doc.splitTextToSize(t.gdprConsent, pageWidth - margin * 2);
  doc.text(gdprLines, margin, y);
  y += gdprLines.length * 3.5 + 4;

  const timestamp = new Date().toLocaleString(localeToBcp47(locale), {
    dateStyle: "long",
    timeStyle: "short",
  });
  doc.setFont("helvetica", "italic");
  doc.text(`${timestamp}`, margin, y);

  return doc;
}

export function pdfToBase64(doc: jsPDF): string {
  return doc.output("datauristring").split(",")[1];
}

function formatDate(isoDate: string, locale: Locale): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(localeToBcp47(locale), {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function localeToBcp47(locale: Locale): string {
  const map: Record<Locale, string> = {
    es: "es-ES",
    en: "en-GB",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    pt: "pt-PT",
  };
  return map[locale];
}

export function buildPlainTextPassengerList(
  locale: Locale,
  passengers: PdfPassenger[],
): string {
  return passengers
    .map((p) => {
      const docLabel = getDocumentTypeLabel(locale, p.documentType);
      return `${p.fullName} - ${docLabel} ${p.documentNumber}`;
    })
    .join("\n");
}
