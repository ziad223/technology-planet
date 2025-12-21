'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast, ToastContainer } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  article: any;
  onDelete: (article: any) => void; // لتحديث الحالة محليًا بعد الحذف
}

export default function DeleteArticleModal({ isOpen, onClose, article, onDelete }: Props) {
  const t = useTranslations('ArticlesPage');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !article) return null;

  const handleDelete = async () => {
    if (!article.id) return;

    try {
      setLoading(true);
      const res = await apiServiceCall({
        url: `articles/${article.id}`,
        method: 'DELETE',
      });

      if (res?.status) {
        toast.success(res.message || t('deleteSuccess') || 'تم حذف المقال بنجاح');
        onDelete(article); // تحديث المقالات في الواجهة
       setTimeout(() =>{
         onClose();
       } , 800)
      } else {
        toast.error(res?.message || t('deleteError') || 'حدث خطأ أثناء الحذف');
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
          <h2 className="text-xl font-bold mb-4">{t('delete')}</h2>
          <p className="mb-4">{t('deleteMessage', { title: article.title })}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              {loading ? t('deleting') || 'جاري الحذف...' : t('delete')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
