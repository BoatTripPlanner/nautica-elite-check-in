"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { de, enGB, es, fr, it, pt } from "date-fns/locale";
import { format, parseISO } from "date-fns";
import type { Locale } from "@/lib/types";
import { localeToHtmlLang } from "@/lib/translations";
import "react-day-picker/style.css";
import "./departure-date-picker.css";

const DATE_FNS_LOCALES = {
  es,
  en: enGB,
  fr,
  de,
  it,
  pt,
} as const;

interface DepartureDatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (isoDate: string) => void;
  locale: Locale;
  required?: boolean;
}

function toIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5 text-slate-400"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}

export default function DepartureDatePicker({
  id,
  label,
  value,
  onChange,
  locale,
  required,
}: DepartureDatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const htmlLang = localeToHtmlLang(locale);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const endMonth = useMemo(() => {
    const d = new Date(today);
    d.setFullYear(d.getFullYear() + 1);
    return d;
  }, [today]);

  const selected = value ? parseISO(value) : undefined;
  const displayValue = selected
    ? format(selected, "P", { locale: DATE_FNS_LOCALES[locale] })
    : "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative" lang={htmlLang}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-left text-sm text-slate-900 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none"
      >
        <span className={displayValue ? "" : "text-slate-400"}>
          {displayValue || "—"}
        </span>
        <CalendarIcon />
      </button>
      {required && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          required
          value={value}
          onChange={() => {}}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
      )}
      {open && (
        <div
          id={listboxId}
          role="dialog"
          aria-label={label}
          className="absolute z-20 mt-2 w-[min(100vw-2rem,20rem)] rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:w-80"
        >
          <DayPicker
            mode="single"
            selected={selected}
            defaultMonth={selected ?? today}
            startMonth={today}
            endMonth={endMonth}
            onSelect={(date) => {
              if (date) {
                onChange(toIsoDate(date));
                setOpen(false);
              }
            }}
            locale={DATE_FNS_LOCALES[locale]}
            weekStartsOn={1}
            captionLayout="dropdown"
            navLayout="around"
            disabled={{ before: today }}
            classNames={{
              root: "departure-picker text-sm",
              month_caption: "w-full",
              dropdowns: "gap-2",
              weekdays: "border-b border-slate-100 pb-2",
            }}
          />
        </div>
      )}
    </div>
  );
}
