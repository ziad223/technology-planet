"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EditSliderModal({ slider, onClose, onSave }: any) {
  const t = useTranslations("sliders");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (slider) {
      setTitle(slider.title);
      setDesc(slider.description);
      setPreview(slider.image);
    }
  }, [slider]);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    onSave({
      id: slider.id,
      title,
      description: desc,
      image: preview,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">

        <h2 className="text-xl font-semibold mb-4">{t("edit_slider")}</h2>

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

        <div className="mb-4">
          <label>{t("title_text")}</label>
          <input
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label>{t("description")}</label>
          <textarea
            className="border p-2 w-full rounded"
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            {t("cancel")}
          </button>

          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            {t("save_changes")}
          </button>
        </div>

      </div>
    </div>
  );
}
