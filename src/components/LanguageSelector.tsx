"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_LABELS } from "@/lib/translations";
import type { Locale } from "@/lib/types";

interface LanguageSelectorProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

const LOCALE_FLAG_CODES: Record<Locale, string> = {
  es: "es",
  en: "gb",
  fr: "fr",
  de: "de",
  it: "it",
  pt: "pt",
};

function FlagIcon({ code, className = "" }: { code: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      width={20}
      height={15}
      alt=""
      className={`inline-block rounded-sm object-cover shadow-sm ${className}`}
      loading="lazy"
    />
  );
}

export default function LanguageSelector({
  locale,
  onChange,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 py-2 pr-2.5 pl-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/30 focus:outline-none sm:gap-2 sm:pr-3"
      >
        <FlagIcon code={LOCALE_FLAG_CODES[locale]} className="shrink-0" />
        <span className="leading-none">{LOCALE_LABELS[locale]}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 shrink-0 text-white/60 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 z-30 mt-1 min-w-[7rem] overflow-hidden rounded-lg border border-slate-700 bg-slate-900 py-1 shadow-xl"
        >
          {LOCALES.map((loc) => (
            <li key={loc} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={locale === loc}
                onClick={() => {
                  onChange(loc);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition hover:bg-white/10 ${
                  locale === loc
                    ? "bg-white/10 font-semibold text-white"
                    : "text-slate-200"
                }`}
              >
                <FlagIcon code={LOCALE_FLAG_CODES[loc]} />
                <span>{LOCALE_LABELS[loc]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
