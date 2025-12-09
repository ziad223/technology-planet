"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EditCityModal({ city, onClose, onSave }: any) {
  const t = useTranslations("cities");

  const [nameAr, setNameAr] = useState("");
  const [clients, setClients] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (city) {
      setNameAr(city.name_ar);
      setClients(city.clients);
      setPreview(city.image);
    }
  }, [city]);

  const handleSubmit = () => {
    onSave({
      id: city.id,
      name_ar: nameAr,
      clients,
      image: preview,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">

        <h2 className="text-xl font-semibold mb-4">{t("edit_city")}</h2>

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

           
          </div>
        </label>

        <div className="mb-4">
          <label>{t("city_name")}</label>
          <input
            className="border p-2 w-full rounded"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label>{t("clients_count")}</label>
          <input
            className="border p-2 w-full rounded"
            type="number"
            value={clients}
            onChange={(e) => setClients(e.target.value)}
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
