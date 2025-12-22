"use client";

import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import apiServiceCall from "@/lib/apiServiceCall";

export default function DeletePageModal({ open, onClose, page, setPages }) {
  const t = useTranslations("pages");

  if (!open || !page) return null;

  const remove = async () => {
    try {
      const res = await apiServiceCall({
        url: `pages/${page.id}`,
        method: "DELETE",
      });

      setPages((p) => p.filter((item) => item.id !== page.id));
      toast.success(res.message || t("deletedSuccessfully"));
      setTimeout(() =>{
         onClose();
      } , 800)
    } catch (error) {
      console.error("Error deleting page:", error);
      toast.error(t("errorOccurred"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white w-96 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          {t("deletePage")}
        </h2>

        <p className="mb-6">{t("confirmDelete")}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
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
