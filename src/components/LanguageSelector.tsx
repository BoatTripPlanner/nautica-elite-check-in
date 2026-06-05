"use client";

import { LOCALES, LOCALE_LABELS } from "@/lib/translations";
import type { Locale } from "@/lib/types";

interface LanguageSelectorProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

const LOCALE_FLAGS: Record<Locale, string> = {
  es: "🇪🇸",
  en: "🇬🇧",
  fr: "🇫🇷",
  de: "🇩🇪",
  it: "🇮🇹",
  pt: "🇵🇹",
};

export default function LanguageSelector({
  locale,
  onChange,
}: LanguageSelectorProps) {
  return (
    <div className="relative">
      <select
        id="language-selector"
        value={locale}
        onChange={(e) => onChange(e.target.value as Locale)}
        className="cursor-pointer appearance-none rounded-lg border border-white/20 bg-white/10 py-2 pr-8 pl-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/30 focus:outline-none"
        aria-label="Select language"
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc} className="bg-slate-900 text-white">
            {LOCALE_FLAGS[loc]} {LOCALE_LABELS[loc]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs text-white/70">
        ▼
      </span>
    </div>
  );
}
