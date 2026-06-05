"use client";

import LanguageSelector from "./LanguageSelector";
import type { Locale } from "@/lib/types";
import type { TranslationStrings } from "@/lib/translations";

interface HeaderProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  t: TranslationStrings;
}

export default function Header({ locale, onLocaleChange, t }: HeaderProps) {
  return (
    <header className="bg-slate-900 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            {t.appTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-300 sm:text-base">
            {t.appSubtitle}
          </p>
        </div>
        <LanguageSelector locale={locale} onChange={onLocaleChange} />
      </div>
    </header>
  );
}
