import { BOATS, getBoatById } from "./boats";
import type { Locale } from "./types";

const ALLOWED_LOCALES: Locale[] = ["es", "en", "fr", "de", "it", "pt"];
const ALLOWED_DOC_TYPES = new Set(["dni", "nie", "passport", "other"]);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_NAME_LENGTH = 120;
const MAX_DOC_NUMBER_LENGTH = 32;
const MAX_PDF_BASE64 = 4 * 1024 * 1024;

export interface ManifestPassenger {
  fullName: string;
  documentType: string;
  documentNumber: string;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidDepartureDate(isoDate: string): boolean {
  if (!ISO_DATE.test(isoDate)) return false;
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

function isValidPassenger(passenger: ManifestPassenger): boolean {
  return (
    typeof passenger.fullName === "string" &&
    passenger.fullName.trim().length > 0 &&
    passenger.fullName.length <= MAX_NAME_LENGTH &&
    ALLOWED_DOC_TYPES.has(passenger.documentType) &&
    typeof passenger.documentNumber === "string" &&
    passenger.documentNumber.trim().length > 0 &&
    passenger.documentNumber.length <= MAX_DOC_NUMBER_LENGTH &&
    /^[\p{L}\p{N}\s.-]+$/u.test(passenger.documentNumber.trim())
  );
}

export function validateManifestPayload(data: {
  locale: string;
  boatId: string;
  boatName: string;
  departureDate: string;
  passengers: ManifestPassenger[];
  pdfBase64: string;
}):
  | { ok: true; boat: (typeof BOATS)[number] }
  | { ok: false; status: number; message: string } {
  const boat = getBoatById(data.boatId);
  if (!boat || boat.name !== data.boatName) {
    return { ok: false, status: 400, message: "Invalid vessel" };
  }

  if (!ALLOWED_LOCALES.includes(data.locale as Locale)) {
    return { ok: false, status: 400, message: "Invalid locale" };
  }

  if (!isValidDepartureDate(data.departureDate)) {
    return { ok: false, status: 400, message: "Invalid departure date" };
  }

  if (
    !Array.isArray(data.passengers) ||
    data.passengers.length === 0 ||
    data.passengers.length > boat.maxCapacity
  ) {
    return { ok: false, status: 400, message: "Invalid passenger list" };
  }

  if (!data.passengers.every(isValidPassenger)) {
    return { ok: false, status: 400, message: "Invalid passenger data" };
  }

  if (
    typeof data.pdfBase64 !== "string" ||
    data.pdfBase64.length === 0 ||
    data.pdfBase64.length > MAX_PDF_BASE64
  ) {
    return { ok: false, status: 400, message: "Invalid attachment" };
  }

  return { ok: true, boat };
}

export function getAllowedBoatIds(): string[] {
  return BOATS.map((boat) => boat.id);
}
