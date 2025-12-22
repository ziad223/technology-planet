'use client';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  city: any;
  onClose: () => void;
  onDelete: (deletedCityId: string) => void;
}

export default function DeleteCityModal({ isOpen, city, onClose, onDelete }: Props) {
  const t = useTranslations('cities');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => apiServiceCall({
      url: `cities/${city.id}`,
      method: 'DELETE'
    }),
    onSuccess: (res: any) => {
      toast.success(res.message || 'تم حذف المدينة بنجاح');
      onDelete(city.id); // تحديث الجدول في parent
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      setTimeout(() =>{
        onClose();
      } , 800)
    },
    onError: (err: any) => {
      console.error(err);
      toast.error('حدث خطأ أثناء حذف المدينة');
    }
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  if (!isOpen || !city) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-red-600">{t('delete_city')}</h2>
        <p className="mb-4">
          {t('delete_confirm')} <strong>{city.name_ar}</strong>؟
        </p>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            {t('cancel')}
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'جاري الحذف...' : t('delete')}
          </button>
        </div>
      </div>
    </div>
  );
}
