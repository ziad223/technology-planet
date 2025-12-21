'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import apiServiceCall from '@/lib/apiServiceCall';
import { toast, ToastContainer } from 'react-toastify';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onDeleted?: (userId: number) => void; // اختياري لتحديث parent لو حابب
}

export default function DeleteUserModal({ isOpen, onClose, user, onDeleted }: Props) {
  const t = useTranslations('UsersPage');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !user) return null;

  // دالة الحذف
const handleDelete = async () => {
  try {
    setLoading(true);
    const res = await apiServiceCall({
      url: `clients/${user.id}`,
      method: 'DELETE',
    });
    if (res?.status) {
      onDeleted?.(user.id);  
      toast.success(res.message || t('successDelete'));
      setTimeout(() =>{
onClose();
      } , 800)
    }
  } catch (error: any) {
    console.error(error);
    toast.error(error?.message || t('error'));
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{t('delete')}</h2>
        <p className="mb-4">{t('deleteMessage', { name: user.name })}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={loading}
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? t('deleting') : t('delete')}
          </button>
        </div>
      </div>
    </div>
  );
}
