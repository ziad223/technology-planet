'use client';

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import AddCityModal from "./AddCityModal";
import EditCityModal from "./EditCityModal";
import DeleteCityModal from "./DeleteCityModal";
import apiServiceCall from "@/lib/apiServiceCall";

export default function CitiesPage() {
  const t = useTranslations("cities");

  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  // Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const data = await apiServiceCall({ url: "cities", method: "GET" });
        // تحويل البيانات حسب شكل الـ API
        const mappedCities = data.data.map((c: any) => ({
          id: c.id.toString(),
          name_ar: c.name,
          clients: c.users_count,
        }));
        setCities(mappedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

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
{addOpen && (
  <AddCityModal
    isOpen={addOpen}
    onClose={() => setAddOpen(false)}
    onSave={(newCity) => setCities(prev => [...prev, { ...newCity, id: newCity.id.toString() }])}
  />
)}     {editOpen && (
  <EditCityModal
    isOpen={editOpen}               // مهم تمرير isOpen لتجنب مشاكل الفتح
    city={selectedCity}             // المدينة اللي هتتحرر
    onClose={() => setEditOpen(false)} 
    onSave={(updatedCity) => {
      setCities(prev =>
        prev.map(c => (c.id === updatedCity.id ? updatedCity : c))
      );
    }}
  />
)}

     {deleteOpen && (
  <DeleteCityModal
    isOpen={deleteOpen}               // مهم تمرير isOpen لتجنب مشاكل الفتح
    city={selectedCity}               // المدينة اللي هتحذف
    onClose={() => setDeleteOpen(false)} 
    onDelete={(deletedCityId) => {
      setCities(prev => prev.filter(c => c.id !== deletedCityId));
    }}
  />
)}

    </div>
  );
}
