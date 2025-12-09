import type { Metadata } from "next";
import "../src/globals.css";
import { headers } from "next/headers";
import { routing } from "../routing";



export const metadata: Metadata = {
  title: "  لوحة التحكم",
  description: "لوحة تحكم  ",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current locale from headers
  const headersList = await headers();
  const currentLocale =
    headersList.get("x-next-intl-locale") || routing.defaultLocale;

  return (
    <html
   
      lang={currentLocale}
      dir={currentLocale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={` min-h-screen `}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
