"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  locale: string;
}

const LanguageSelector: React.FC<Props> = ({ locale }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isArabic = locale === "ar";
  const newLocale = isArabic ? "en" : "ar";

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" }
  ];

  // إغلاق القائمة لما تضغط برا
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeLanguage = (langCode: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "");
    const query = searchParams.toString();
    const queryPart = query ? `?${query}` : "";

    const isDashboard = pathname.includes("/dashboard");
    const newPath = isDashboard
      ? `/${langCode}/dashboard`
      : `/${langCode}${pathWithoutLocale}`;

    window.location.href = `${newPath}${queryPart}`;
  };

  const currentLang = languages.find((l) => l.code === locale);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* الزر الرئيسي */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe size={20} className="text-gray-600" />
        <span className="hidden md:inline text-gray-700 text-sm">
         {currentLang?.name}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* القائمة */}
      {open && (
        <div
          className={`
            absolute top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200
            py-2 z-50
            ${locale === "ar" ? "right-0" : "left-0"}
          `}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`
                w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3
                ${locale === lang.code ? "bg-blue-50 text-blue-600" : "text-gray-700"}
              `}
            >
              {/* <span className="text-lg">{lang.flag}</span> */}
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
