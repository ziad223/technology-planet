"use client";

import { useTranslations } from "next-intl";

export default function DeleteSliderModal({ slider, onClose, onDelete }: any) {
  const t = useTranslations("sliders");

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">

        <h2 className="text-xl font-semibold mb-4 text-red-600">{t("delete_slider")}</h2>

        <p className="mb-4">
          {t("delete_confirm")} <strong>{slider.title}</strong>؟
        </p>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            {t("cancel")}
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            {t("delete")}
          </button>
        </div>

      </div>
    </div>
  );
}
