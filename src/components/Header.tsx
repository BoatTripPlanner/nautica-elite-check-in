"use client";

import LanguageSelector from "./LanguageSelector";
import type { Locale } from "@/lib/types";
import type { TranslationStrings } from "@/lib/translations";

interface HeaderProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  t: TranslationStrings;
}

function AnchorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-9 w-9 shrink-0 text-blue-300"
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14" />
      <path d="M5 15h14" />
      <path d="M7 11c0-2.76 2.24-5 5-5s5 2.24 5 5" />
    </svg>
  );
}

export default function Header({ locale, onLocaleChange, t }: HeaderProps) {
  return (
    <header className="bg-slate-900 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <AnchorIcon />
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {t.appTitle}
            </h1>
            <p className="mt-1 text-sm text-slate-300 sm:text-base">
              {t.appSubtitle}
            </p>
          </div>
        </div>
        <LanguageSelector locale={locale} onChange={onLocaleChange} />
      </div>
    </header>
  );
}
