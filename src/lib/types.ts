export type Locale = "es" | "en" | "fr" | "de" | "it" | "pt";

export type DocumentType = "dni" | "nie" | "passport" | "other";

export interface Passenger {
  fullName: string;
  documentType: DocumentType | "";
  documentNumber: string;
}

export interface Boat {
  id: string;
  name: string;
  maxCapacity: number;
}

export interface ManifestPayload {
  boatId: string;
  boatName: string;
  departureDate: string;
  passengers: Array<{
    fullName: string;
    documentType: string;
    documentNumber: string;
  }>;
  locale: Locale;
}
