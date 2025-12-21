'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import apiServiceCall from '@/lib/apiServiceCall';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onDelete: (product: any) => void;
}

export default function DeleteProductModal({ isOpen, onClose, product, onDelete }: Props) {
  const t = useTranslations('ProductsPage');

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    try {
      const res = await apiServiceCall({
        url: `products/${product.id}`,
        method: 'DELETE',
      });

      toast.success(res.message || 'تم حذف المنتج بنجاح');
      onDelete(product);
      setTimeout(() =>{
        onClose();
      } , 800)
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'حدث خطأ أثناء حذف المنتج');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{t('delete')}</h2>
        <p className="mb-4">{t('deleteMessage', { name: product.name })}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {t('delete')}
          </button>
        </div>
      </div>
    </div>
  );
}
