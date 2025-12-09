"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Edit } from "lucide-react";
import { useTranslations } from "next-intl";

import AddSliderModal from "./AddSliderModal";
import EditSliderModal from "./EditSliderModal";
import DeleteSliderModal from "./DeleteSliderModal";

export default function SlidersPage() {
  const t = useTranslations("sliders");

  const [sliders, setSliders] = useState([
    {
      id: "1",
      title: "أفضل العروض",
      description: "خصومات تصل إلى 50%",
      image: "/images/hero-1.png",
    },
    {
      id: "2",
      title: "منتجات جديدة",
      description: "وصل حديثاً إلى متجرنا",
      image: "/images/hero-2.webp",
    },
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedSlider, setSelectedSlider] = useState(null);

  const openEdit = (slider: any) => {
    setSelectedSlider(slider);
    setEditOpen(true);
  };

  const openDelete = (slider: any) => {
    setSelectedSlider(slider);
    setDeleteOpen(true);
  };

  const addSlider = (slider: any) => {
    setSliders([...sliders, { ...slider, id: Date.now().toString() }]);
  };

  const updateSlider = (updated: any) => {
    setSliders(sliders.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteSlider = () => {
    setSliders(sliders.filter((s) => s.id !== selectedSlider?.id));
  };

  return (
    <div className="p-6">

      {/* Header */}
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
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">{t("image")}</th>
              <th className="p-3">{t("title_text")}</th>
              <th className="p-3">{t("description")}</th>
              <th className="p-3">{t("actions")}</th>
            </tr>
          </thead>

          <tbody>
            {sliders.map((slider, index) => (
              <tr key={slider.id} className="border-b text-center">
                <td className="p-3">{index + 1}</td>

                <td className="p-3 flex justify-center">
                  <img
                    src={slider.image}
                    className="w-24 h-16 object-cover rounded-md border"
                  />
                </td>

                <td className="p-3">{slider.title}</td>
                <td className="p-3">{slider.description}</td>

                <td className="">
                 <div className="p-3 flex justify-center items-center gap-4">
                     <button
                    onClick={() => openEdit(slider)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Edit size={20} />
                  </button>

                  <button
                    onClick={() => openDelete(slider)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                 </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modals */}
      {addOpen && <AddSliderModal onClose={() => setAddOpen(false)} onSave={addSlider} />}
      {editOpen && (
        <EditSliderModal
          slider={selectedSlider}
          onClose={() => setEditOpen(false)}
          onSave={updateSlider}
        />
      )}
      {deleteOpen && (
        <DeleteSliderModal
          slider={selectedSlider}
          onClose={() => setDeleteOpen(false)}
          onDelete={deleteSlider}
        />
      )}

    </div>
  );
}
