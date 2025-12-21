'use client';
import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';
import apiServiceCall from '@/lib/apiServiceCall';
import { useTranslations } from 'next-intl';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (category: any) => void; // ترجع الكاتيجوري الجديد
}

export default function AddCategoryModal({ isOpen, onClose, onAdd }: AddCategoryModalProps) {
  const t = useTranslations('Categories');

  const [name, setName] = useState('');
  const [status, setStatus] = useState(1);
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name) {
      toast.error(t('addModal.errorName'));
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('status', status);
      if (cover) formData.append('cover', cover);

      const res = await apiServiceCall({
        url: 'categories',
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res?.data) {
        toast.success(res.message || t('addModal.success'));
        onAdd(res.data); // نضيف الكاتيجوري الجديد
        setName('');
        setStatus(1);
        setCover(null);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">{t('addModal.title')}</h2>

        {/* الاسم */}
        <input
          type="text"
          placeholder={t('addModal.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
        />

        {/* حالة الكاتيجوري */}
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={status === 1}
onChange={(e) => setStatus(e.target.checked ? 1 : 0)}
            className="w-5 h-5"
          />
          <span>{t('addModal.active')}</span>
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
              <span>{t('addModal.upload')}</span>
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
            {t('addModal.cancel')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? t('addModal.saving') : t('addModal.submit')}
          </button>
        </div>
      </div>
    </div>
  );
}
