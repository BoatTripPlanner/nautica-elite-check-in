"use client";

import { useEffect, useMemo, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Header from "./Header";
import DepartureDatePicker from "./DepartureDatePicker";
import { BOATS, getBoatById } from "@/lib/boats";
import { db } from "@/lib/firebase";
import {
  generateManifestPdf,
  pdfToBase64,
} from "@/lib/generatePdf";
import { localeToHtmlLang, translations } from "@/lib/translations";
import type { DocumentType, Locale, Passenger } from "@/lib/types";

const EMPTY_PASSENGER: Passenger = {
  fullName: "",
  documentType: "",
  documentNumber: "",
};

function isPassengerComplete(p: Passenger): boolean {
  return (
    p.fullName.trim() !== "" &&
    p.documentType !== "" &&
    p.documentNumber.trim() !== ""
  );
}

export default function CheckInForm() {
  const [locale, setLocale] = useState<Locale>("es");
  const [boatId, setBoatId] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState<Passenger[]>([
    { ...EMPTY_PASSENGER },
  ]);
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang(locale);
  }, [locale]);

  const selectedBoat = useMemo(() => getBoatById(boatId), [boatId]);
  const maxCapacity = selectedBoat?.maxCapacity ?? Infinity;
  const atMaxCapacity = passengers.length >= maxCapacity;

  const filledPassengers = useMemo(
    () => passengers.filter(isPassengerComplete),
    [passengers],
  );

  const canSubmit =
    boatId !== "" &&
    departureDate !== "" &&
    filledPassengers.length > 0 &&
    gdprAccepted &&
    !isSubmitting;

  function updatePassenger(index: number, field: keyof Passenger, value: string) {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );
  }

  function addPassenger() {
    if (atMaxCapacity) return;
    setPassengers((prev) => [...prev, { ...EMPTY_PASSENGER }]);
  }

  function removePassenger(index: number) {
    if (passengers.length <= 1) return;
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !selectedBoat) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const manifestPassengers = filledPassengers.map((p) => ({
      fullName: p.fullName.trim(),
      documentType: p.documentType,
      documentNumber: p.documentNumber.trim(),
    }));

    try {
      await addDoc(collection(db, "despachos_diarios"), {
        boatId: selectedBoat.id,
        boatName: selectedBoat.name,
        departureDate,
        passengers: manifestPassengers,
        locale,
        gdprConsentAccepted: true,
        createdAt: serverTimestamp(),
      });

      const pdfDoc = generateManifestPdf({
        locale,
        boatName: selectedBoat.name,
        departureDate,
        passengers: manifestPassengers,
      });

      const pdfBase64 = pdfToBase64(pdfDoc);

      const emailResponse = await fetch("/api/send-manifest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          boatId: selectedBoat.id,
          boatName: selectedBoat.name,
          departureDate,
          passengers: manifestPassengers,
          pdfBase64,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Email API failed");
      }

      setStatusMessage({ type: "success", text: t.submitSuccess });
      setBoatId("");
      setDepartureDate("");
      setPassengers([{ ...EMPTY_PASSENGER }]);
      setGdprAccepted(false);
    } catch {
      setStatusMessage({ type: "error", text: t.submitError });
    } finally {
      setIsSubmitting(false);
    }
  }

  const documentTypes: { value: DocumentType; label: string }[] = [
    { value: "dni", label: t.docDni },
    { value: "nie", label: t.docNie },
    { value: "passport", label: t.docPassport },
    { value: "other", label: t.docOther },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header locale={locale} onLocaleChange={setLocale} t={t} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Boat & Date */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="boat"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  {t.selectBoat} <span className="text-red-500">*</span>
                </label>
                <select
                  id="boat"
                  required
                  value={boatId}
                  onChange={(e) => setBoatId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none"
                >
                  <option value="">{t.selectBoatPlaceholder}</option>
                  {BOATS.map((boat) => (
                    <option key={boat.id} value={boat.id}>
                      {boat.name} (max. {boat.maxCapacity})
                    </option>
                  ))}
                </select>
              </div>

              <DepartureDatePicker
                id="departure-date"
                label={t.departureDate}
                value={departureDate}
                onChange={setDepartureDate}
                locale={locale}
                required
              />
            </div>
          </section>

          {/* Passengers */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-semibold text-slate-800">
              {t.passengerData}
            </h2>

            <div className="space-y-6">
              {passengers.map((passenger, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-100 bg-slate-50/50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      {t.passenger} {index + 1}
                    </span>
                    {passengers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePassenger(index)}
                        className="text-xs text-slate-400 transition hover:text-red-500"
                        aria-label={`Remove passenger ${index + 1}`}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-medium text-slate-600">
                        {t.fullName}
                      </label>
                      <input
                        type="text"
                        value={passenger.fullName}
                        onChange={(e) =>
                          updatePassenger(index, "fullName", e.target.value)
                        }
                        placeholder={t.fullName}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-600">
                        {t.documentType}
                      </label>
                      <select
                        value={passenger.documentType}
                        onChange={(e) =>
                          updatePassenger(index, "documentType", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none"
                      >
                        <option value="">—</option>
                        {documentTypes.map((dt) => (
                          <option key={dt.value} value={dt.value}>
                            {dt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-600">
                        {t.documentNumber}
                      </label>
                      <input
                        type="text"
                        value={passenger.documentNumber}
                        onChange={(e) =>
                          updatePassenger(
                            index,
                            "documentNumber",
                            e.target.value,
                          )
                        }
                        placeholder={t.documentNumber}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {atMaxCapacity && selectedBoat && (
              <div
                role="alert"
                className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800"
              >
                {t.maxCapacityReached}
              </div>
            )}

            <button
              type="button"
              onClick={addPassenger}
              disabled={atMaxCapacity || !boatId}
              className="mt-5 w-full rounded-lg border-2 border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-6"
            >
              + {t.addPassenger}
            </button>
          </section>

          {/* GDPR */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={gdprAccepted}
                onChange={(e) => setGdprAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
              />
              <span className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                {t.gdprConsent}
              </span>
            </label>
          </section>

          {/* Submit */}
          <div className="space-y-4">
            {statusMessage && (
              <div
                role="alert"
                className={`rounded-lg px-4 py-3 text-sm ${
                  statusMessage.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-lg bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            >
              {isSubmitting ? t.submitting : t.submitRegistration}
            </button>
          </div>
        </form>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Náutica Elite — Marina del Este
      </footer>
    </div>
  );
}
