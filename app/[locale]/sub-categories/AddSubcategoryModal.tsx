'use client';
import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';
import apiServiceCall from '@/lib/apiServiceCall';
import { useTranslations } from 'next-intl';

interface AddSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (subcategory: any) => void; // ترجع الـ subcategory الجديد
}

export default function AddSubcategoryModal({ isOpen, onClose, onAdd }: AddSubcategoryModalProps) {
  const t = useTranslations('SubcategoriesPage');

  const [name, setName] = useState('');
  const [status, setStatus] = useState(1);
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name) {
      toast.error(t('errorName') || 'يرجى إدخال الاسم');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('status', String(status));
      if (cover) formData.append('cover', cover);

      const res = await apiServiceCall({
        url: 'subcategories',
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res?.data) {
        toast.success(res.message || 'تمت إضافة القسم الفرعي بنجاح');
        onAdd(res.data);
        setName('');
        setStatus(1);
        setCover(null);
        setTimeout(() => {
          onClose();
        }, 800);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <ToastContainer />
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">{t('add')}</h2>

        {/* الاسم */}
        <input
          type="text"
          placeholder={t('name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
        />

        {/* حالة التفعيل */}
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={status === 1}
            onChange={(e) => setStatus(e.target.checked ? 1 : 0)}
            className="w-5 h-5"
          />
          <span>فعال</span>
        </label>

        {/* صندوق رفع الصورة */}
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full h-40 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          {cover ? (
            <img
              src={URL.createObjectURL(cover)}
              alt="preview"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <FiUpload size={30} />
              <span>رفع الصورة</span>
            </div>
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => setCover(e.target.files?.[0] || null)}
            className="hidden"
            accept="image/*"
          />
        </div>

        {/* الأزرار */}
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </button>
        </div>
      </div>
    </div>
  );
}
