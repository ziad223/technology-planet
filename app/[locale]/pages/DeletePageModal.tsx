"use client";

import { useTranslations } from "next-intl";

export default function DeletePageModal({ open, onClose, page, setPages }) {
  const t = useTranslations("pages");

  if (!open) return null;

  const remove = () => {
    setPages((p) => p.filter((item) => item.id !== page.id));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg p-6">

        <h2 className="text-lg font-semibold mb-4 text-red-600">
          {t("deletePage")}
        </h2>

        <p className="mb-6">{t("confirmDelete")}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2">
            {t("cancel")}
          </button>

          <button
            onClick={remove}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
