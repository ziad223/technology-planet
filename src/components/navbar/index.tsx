"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LogOut, Globe, ChevronDown, Menu, X, Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

interface DashboardNavbarProps {
  locale: string;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Navbar: React.FC<DashboardNavbarProps> = ({
  locale,
  onToggleSidebar,
  sidebarCollapsed
}) => {
  const t = useTranslations("Dashboard");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isArabic = locale === "ar";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: t("english"), flag: "🇺🇸" },
    { code: "ar", name: t("arabic"), flag: "🇸🇦" }
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  // Click Outside Closer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Change Language
  const handleLanguageChange = (langCode: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "");
    const query = searchParams.toString();
    const q = query ? `?${query}` : "";
    const isDashboard = pathname.includes("/dashboard");
    const newPath = isDashboard
      ? `/${langCode}/dashboard`
      : `/${langCode}${pathWithoutLocale}`;
    window.location.href = `${newPath}${q}`;
  };
const handleLogout = () => {
 document.cookie =
    "loggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  // اقفل الدروب داون
  setDropdownOpen(false);

  // روح للوجين حسب اللغة
  window.location.href = `/${locale}/login`;
};

  return (
    <header
      className="bg-white shadow-sm h-16 md:h-20 px-4 md:px-8 flex items-center justify-between border-b border-gray-200"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Logo + Language */}
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <Image src = '/images/logo.png' alt="logo" width={150} height={150} />
        </div>

        {/* Language Dropdown */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Globe size={20} className="text-gray-600" />
            <span className="hidden md:inline text-gray-700 text-sm">
              {currentLanguage?.flag} {currentLanguage?.name}
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${languageDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {languageDropdownOpen && (
            <div
              className={`absolute top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 ${
                isArabic ? "right-0" : "left-0"
              }`}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 ${
                    locale === language.code ? "bg-blue-50 text-blue-600" : "text-gray-700"
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Admin Section */}
      <div className="flex items-center gap-3 md:gap-4" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg md:text-xl">
                A
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900 text-sm md:text-base">Admin</p>
              <p className="text-gray-600 text-xs md:text-sm">{t("management")}</p>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div
              className={`absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 ${
                isArabic ? "left-0" : "right-0"
              }`}
            >
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-red-600 flex items-center gap-3"
              >
                <LogOut size={18} />
                <span>{t("logout")}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        onClick={() => setMobileSearchOpen(true)}
      >
        <Search size={20} />
      </button>

      {mobileSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 md:hidden">
          <div className="bg-white rounded-lg w-full max-w-md mt-16 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="flex-1 p-2 border-b focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
