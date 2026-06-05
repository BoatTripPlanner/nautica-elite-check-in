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

const selectClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm font-medium text-slate-900 capitalize focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none";

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
  const dateLocale = DATE_FNS_LOCALES[locale];

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
    ? format(selected, "P", { locale: dateLocale })
    : "";

  const [calendarMonth, setCalendarMonth] = useState<Date>(selected ?? today);

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        value: index,
        label: format(new Date(2024, index, 1), "LLLL", { locale: dateLocale }),
      })),
    [dateLocale],
  );

  const yearOptions = useMemo(() => {
    const startYear = today.getFullYear();
    const endYear = endMonth.getFullYear();
    return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
  }, [today, endMonth]);

  useEffect(() => {
    if (open) {
      setCalendarMonth(selected ?? today);
    }
  }, [open, selected, today]);

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

  function handleMonthSelect(monthIndex: number) {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), monthIndex, 1),
    );
  }

  function handleYearSelect(year: number) {
    setCalendarMonth(new Date(year, calendarMonth.getMonth(), 1));
  }

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
          className="departure-picker-popover absolute z-30 mt-2 w-[min(100vw-2rem,18rem)] rounded-xl border border-slate-200 bg-white p-3 shadow-xl sm:w-full sm:max-w-none"
        >
          <div className="mb-3 grid grid-cols-2 gap-2">
            <select
              aria-label="Month"
              value={calendarMonth.getMonth()}
              onChange={(e) => handleMonthSelect(Number(e.target.value))}
              className={selectClassName}
            >
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Year"
              value={calendarMonth.getFullYear()}
              onChange={(e) => handleYearSelect(Number(e.target.value))}
              className={selectClassName}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <DayPicker
            mode="single"
            selected={selected}
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
            startMonth={today}
            endMonth={endMonth}
            onSelect={(date) => {
              if (date) {
                onChange(toIsoDate(date));
                setOpen(false);
              }
            }}
            locale={dateLocale}
            weekStartsOn={1}
            hideNavigation
            components={{ MonthCaption: () => <></> }}
            disabled={{ before: today }}
            classNames={{
              root: "departure-picker text-sm",
              weekdays: "border-b border-slate-100 pb-2",
            }}
          />
        </div>
      )}
    </div>
  );
}
