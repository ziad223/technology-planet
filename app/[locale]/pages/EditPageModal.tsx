"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import apiServiceCall from "@/lib/apiServiceCall";

export default function EditPageModal({ open, onClose, page, setPages }) {
  const t = useTranslations("pages");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page) {
      setTitle(page.title || "");
      setContent(page.content || "");
    }
  }, [page]);

  if (!open || !page) return null;

  const submit = async () => {
    if (!title) {
      toast.error(t("enterPageName"));
      return;
    }

    setLoading(true);
    try {
      const payload = { name: title, content };
      const res = await apiServiceCall({
        url: `pages/${page.id}`,
        method: "PUT",
        body: payload,
      });

      setPages((prev) =>
        prev.map((item) =>
          item.id === page.id
            ? {
                ...item,
                title: res.data.name,
                content: res.data.content,
                updated_at: res.data.updated_at,
              }
            : item
        )
      );

      toast.success(res.message || t("updatedSuccessfully"));
      setTimeout(() =>{
         onClose();
      } , 800)
    } catch (error) {
      console.error("Error updating page:", error);
      toast.error(t("errorOccurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <ToastContainer />
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

        <div className="mb-4">
          <label className="block mb-1">{t("content")}</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
            disabled={loading}
          >
            {t("cancel")}
          </button>
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? t("saving") : t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}
