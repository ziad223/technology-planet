'use client';

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiServiceCall from "@/lib/apiServiceCall";

export default function EditSliderModal({ slider, onClose }: any) {
  const t = useTranslations("sliders");
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (slider) {
      setTitle(slider.title);
      setDesc(slider.description);
      setPreview(slider.image);
      setFile(null);
    }
  }, [slider]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!slider) return;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", desc);
      if (file) formData.append("cover", file);

      const res = await apiServiceCall({
        url: `sliders/${slider.id}`,
        method: "PUT",
        body: formData,
        headers: {},
      });

      return res.data;
    },
    onSuccess: (data) => {
      // تحديث cache الخاص بـ sliders
      queryClient.setQueryData(['sliders'], (oldData: any) => {
        if (!oldData) return [];
        return oldData.map((s: any) =>
          s.id === slider.id ? { ...s, title: data.title, description: data.subtitle, image: data.cover_url || preview } : s
        );
      });

      toast.success("تم تعديل السلايدر بنجاح!");
      setTimeout(() =>{
        onClose();
      } , 800)
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تعديل السلايدر");
    },
  });

  const handleImage = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">{t("edit_slider")}</h2>

        {/* Image Upload */}
        <label className="block mb-4">
          <div className="border-2 border-dashed rounded-lg h-40 flex justify-center items-center cursor-pointer">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="text-gray-500 flex flex-col items-center">
                <Upload size={32} />
                <span>{t("upload_image")}</span>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImage} />
          </div>
        </label>

        {/* Title */}
        <div className="mb-4">
          <label>{t("title_text")}</label>
          <input
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label>{t("description")}</label>
          <textarea
            className="border p-2 w-full rounded"
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            {t("cancel")}
          </button>

          <button
            onClick={handleSubmit}
            className={`px-4 py-2 bg-blue-600 text-white rounded ${mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? t("saving") : t("save_changes")}
          </button>
        </div>
      </div>
    </div>
  );
}
