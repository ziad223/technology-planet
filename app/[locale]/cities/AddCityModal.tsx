

"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AddCityModal({ onClose, onSave }: any) {
  const t = useTranslations("cities");

  const [nameAr, setNameAr] = useState("");
  const [clients, setClients] = useState("");
  const [image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    onSave({
      name_ar: nameAr,
      clients: Number(clients),
      image: preview,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">

        <h2 className="text-xl font-semibold mb-4">{t("add_city")}</h2>

        {/* Upload */}
       

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1">{t("city_name")}</label>
          <input
            className="border p-2 w-full rounded"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
          />
        </div>

        {/* Clients */}
        <div className="mb-4">
          <label className="block mb-1">{t("clients_count")}</label>
          <input
            className="border p-2 w-full rounded"
            type="number"
            value={clients}
            onChange={(e) => setClients(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            {t("cancel")}
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            {t("save")}
          </button>
        </div>

      </div>
    </div>
  );
}
