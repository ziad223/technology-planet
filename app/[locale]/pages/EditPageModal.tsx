"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function EditPageModal({ open, onClose, page, setPages }) {
  const t = useTranslations("pages");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (page) setTitle(page.title);
  }, [page]);

  if (!open) return null;

  const submit = () => {
    setPages((p) =>
      p.map((item) => (item.id === page.id ? { ...item, title } : item))
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg p-6">

        <h2 className="text-lg font-semibold mb-4">{t("editPage")}</h2>

        <div className="mb-4">
          <label className="block mb-1">{t("pageName")}</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2" onClick={onClose}>
            {t("cancel")}
          </button>

          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}
