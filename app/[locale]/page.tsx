import DashboardHomeContent from "@/components/dashboard/DashboardHomeContent";
import { getTranslations } from "next-intl/server";

export default async function DashboardHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard");
  
  return (
    <div>
      <DashboardHomeContent />
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "لوحة التحكم - الرئيسية",
  };
}