import type { Metadata } from "next";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import Providers from "@/providers/providers";
import { notFound } from "next/navigation";
import { locales } from "../../navigation";
import { getSettings } from "@/lib/serverActions";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar";
import "../../src/globals.css";
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: "لوحة تحكم",
  description: "لوحة تحكم",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale: currentLocale } = resolvedParams;
  
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  console.log("currentLocale", currentLocale);
  console.log("pathname", pathname);

  if (!locales.includes(currentLocale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${currentLocale}.json`)).default;
  } catch (error) {
    notFound();
  }

  let settingsResponse;
  try {
    settingsResponse = await getSettings(currentLocale);
  } catch (error) {
    console.log(error);
  }

  const settings = settingsResponse?.data;

  const isAuthPage = pathname.includes('/login') || 
  pathname.includes('/register');

  return (
    <NextIntlClientProvider
      locale={currentLocale || "en"}
      messages={messages}
      timeZone="Asia/Dubai"
    >
      <Providers locale={currentLocale || "en"}>
        <div
          dir={currentLocale === "ar" ? "rtl" : "ltr"}
          lang={currentLocale}
          className="min-h-screen"
        >
          {isAuthPage ? (
            // عرض بدون سايدبار ونافبار لصفحات المصادقة
            <div className="min-h-screen bg-gray-100">
              {children}
            </div>
          ) : (
            // عرض مع سايدبار ونافبار لباقي الصفحات
            <div className="min-h-screen bg-gray-100">
              <div className="flex h-screen">
                {/* السايدبار */}
                <Sidebar locale={currentLocale} />
                
                {/* المحتوى الرئيسي */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* النافبار العلوية */}
                  <Navbar locale={currentLocale} />
                  
                  {/* المحتوى المتغير */}
                  <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                    <div className="bg-white rounded-lg shadow p-4 md:p-6 min-h-full">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </div>
          )}
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}