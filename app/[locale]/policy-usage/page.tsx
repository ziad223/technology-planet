import PolicyEditor from "./PolicyEditor";
import { getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations("policyPage");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold text-start">{t("title")}</h1>
      <PolicyEditor />
    </div>
  );
}
