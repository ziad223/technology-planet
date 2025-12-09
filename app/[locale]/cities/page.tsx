"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Edit } from "lucide-react";
import { useTranslations } from "next-intl";

import AddCityModal from "./AddCityModal";
import EditCityModal from "./EditCityModal";
import DeleteCityModal from "./DeleteCityModal";

export default function CitiesPage() {
  const t = useTranslations("cities");

  const [cities, setCities] = useState([
    {
      id: "1",
      name_ar: "القاهرة",
      clients: 120,
      image: "https://via.placeholder.com/80",
    },
    {
      id: "2",
      name_ar: "الإسكندرية",
      clients: 50,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState(null);

  const openEdit = (city: any) => {
    setSelectedCity(city);
    setEditOpen(true);
  };

  const openDelete = (city: any) => {
    setSelectedCity(city);
    setDeleteOpen(true);
  };

  const addCity = (city: any) => {
    setCities([...cities, { ...city, id: Date.now().toString() }]);
  };

  const updateCity = (updated: any) => {
    setCities(cities.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteCity = () => {
    setCities(cities.filter((c) => c.id !== selectedCity?.id));
  };

  return (
    <div className="p-6">

      {/* Title + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("title")}</h1>

        <button
          onClick={() => setAddOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          {t("add")}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">{t("city_name")}</th>
              <th className="p-3">{t("clients_count")}</th>
              <th className="p-3">{t("actions")}</th>
            </tr>
          </thead>

          <tbody>
            {cities.map((city, index) => (
              <tr key={city.id} className="border-b text-center">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{city.name_ar}</td>
                <td className="p-3">{city.clients}</td>

                <td className="p-3 flex justify-center gap-4">
                  <button
                    onClick={() => openEdit(city)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Edit size={20} />
                  </button>

                  <button
                    onClick={() => openDelete(city)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modals */}
      {addOpen && <AddCityModal onClose={() => setAddOpen(false)} onSave={addCity} />}
      {editOpen && (
        <EditCityModal
          city={selectedCity}
          onClose={() => setEditOpen(false)}
          onSave={updateCity}
        />
      )}
      {deleteOpen && (
        <DeleteCityModal
          city={selectedCity}
          onClose={() => setDeleteOpen(false)}
          onDelete={deleteCity}
        />
      )}
    </div>
  );
}
