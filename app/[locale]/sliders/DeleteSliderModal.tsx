'use client';

import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";

export default function DeleteSliderModal({ slider, onClose }: any) {
  const t = useTranslations("sliders");
  const queryClient = useQueryClient();

  // mutation للحذف
  const mutation = useMutation({
    mutationFn: async () => {
      if (!slider) return;
      await apiServiceCall({ url: `sliders/${slider.id}`, method: "DELETE" });
      return slider.id;
    },
    onSuccess: (deletedId) => {
      // تحديث cache
      queryClient.setQueryData(['sliders'], (oldData: any) => {
        if (!oldData) return [];
        return oldData.filter((s: any) => s.id !== deletedId);
      });

      toast.success("تم حذف السلايدر بنجاح!");
      setTimeout(() =>{
        onClose();
      } , 800)
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف السلايدر");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">

        <h2 className="text-xl font-semibold mb-4 text-red-600">{t("delete_slider")}</h2>

        <p className="mb-4">
          {t("delete_confirm")} <strong>{slider?.title}</strong>؟
        </p>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            {t("cancel")}
          </button>

          <button
            onClick={handleDelete}
            className={`px-4 py-2 bg-red-600 text-white rounded ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? t("deleting") : t("delete")}
          </button>
        </div>

      </div>
    </div>
  );
}
