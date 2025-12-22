'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import apiServiceCall from '@/lib/apiServiceCall';

import AddSliderModal from './AddSliderModal';
import EditSliderModal from './EditSliderModal';
import DeleteSliderModal from './DeleteSliderModal';

export default function SlidersPage() {
  const t = useTranslations('sliders');

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState<any>(null);
  const [sliders, setSliders] = useState<any[]>([]);

  // Fetch sliders from API using react-query
  const { isLoading } = useQuery({
    queryKey: ['sliders'],
    queryFn: async () => {
      const res = await apiServiceCall({ url: 'sliders', method: 'GET' });
      const mapped = res.data.map((s: any) => ({
        id: s.id.toString(),
        title: s.title,
        description: s.subtitle,
        image: s.cover_url,
      }));
      setSliders(mapped);
      return mapped;
    },
    refetchOnWindowFocus: false,
  });

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

  const deleteSlider = (deletedId?: string) => {
    setSliders(sliders.filter((s) => s.id !== (deletedId || selectedSlider?.id)));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <button
          onClick={() => setAddOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          {t('add')}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">{t('image')}</th>
              <th className="p-3">{t('title_text')}</th>
              <th className="p-3">{t('description')}</th>
              <th className="p-3">{t('actions')}</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  جاري التحميل...
                </td>
              </tr>
            ) : sliders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  لا توجد بيانات
                </td>
              </tr>
            ) : (
              sliders.map((slider, index) => (
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
                  <td className="p-3 flex justify-center items-center gap-4">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {addOpen && <AddSliderModal isOpen={addOpen} onClose={() => setAddOpen(false)} onSave={addSlider} />}
      {editOpen && (
        <EditSliderModal
          isOpen={editOpen}
          slider={selectedSlider}
          onClose={() => setEditOpen(false)}
          onSave={updateSlider}
        />
      )}
      {deleteOpen && (
        <DeleteSliderModal
          isOpen={deleteOpen}
          slider={selectedSlider}
          onClose={() => setDeleteOpen(false)}
          onDelete={deleteSlider}
        />
      )}
    </div>
  );
}
