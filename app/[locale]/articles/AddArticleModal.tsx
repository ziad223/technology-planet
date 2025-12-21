'use client';
import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';
import apiServiceCall from '@/lib/apiServiceCall';
import { useTranslations } from 'next-intl';

interface Article {
  id: number;
  title: string;
  content: string;
  active: boolean;
  image?: string;
  created_at: string;
}

interface AddArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (article: Article) => void;
}

export default function AddArticleModal({ isOpen, onClose, onAdd }: AddArticleModalProps) {
  const t = useTranslations('ArticlesPage');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [active, setActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error(t('addModal.errorEmpty'));
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('active', active ? '1' : '0');
      if (image) formData.append('image', image);

      const res = await apiServiceCall({
        url: 'articles',
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res?.status) {
        toast.success(res.message || t('addModal.success'));
        onAdd(res.data);
        setTitle('');
        setContent('');
        setActive(true);
        setImage(null);
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
      <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">{t('addModal.title')}</h2>

        <input
          type="text"
          placeholder={t('addModal.title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
        />

        <textarea
          placeholder={t('addModal.content')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
        />

       

        <div
          onClick={() => inputRef.current?.click()}
          className="w-full h-40 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
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
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="hidden"
            accept="image/*"
          />
        </div>
 <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-5 h-5"
          />
          <span>{t('addModal.active')}</span>
        </label>
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
