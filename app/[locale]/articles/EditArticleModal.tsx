'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { toast, ToastContainer } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';
import Image from 'next/image';
import { FiUpload } from 'react-icons/fi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  article: any;
  onEdit: (updatedArticle: any) => void;
}

export default function EditArticleModal({ isOpen, onClose, article, onEdit }: Props) {
  const t = useTranslations('ArticlesPage');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [active, setActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (article) {
      setTitle(article.title || '');
      setContent(article.content || '');
      setActive(article.active ?? true);
      setImage(null); // الصورة الجديدة افتراضياً فارغة
    }
  }, [article]);

  if (!isOpen || !article) return null;

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error(t('errorEmpty'));
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
formData.append('title', title || '');
      formData.append('content', content);
      formData.append('active', active ? '1' : '0');
      if (image) formData.append('image', image);

      const res = await apiServiceCall({
        url: `articles/${article.id}`,
        method: 'PUT',
        body: formData,
        // headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res?.data) {
        toast.success(res.message || t('successEdit'));
        onEdit(res.data); // تحديث المقال في الجدول
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
        <h2 className="text-xl font-semibold">{t('edit')}</h2>

        <input
          type="text"
          placeholder={t('title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <textarea
          placeholder={t('content')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-5 h-5"
          />
          <span>{t('active')}</span>
        </label>

        {/* رفع الصورة الجديدة */}
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full h-40 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              alt="preview"
              width={200}
              height={150}
              className="object-cover rounded"
            />
          ) : article.image ? (
            <Image
              src={article.image}
              alt="current"
              width={200}
              height={150}
              className="object-cover rounded"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <FiUpload size={30} />
              <span>{t('upload')}</span>
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

        <div className="flex justify-end gap-2 mt-2">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 bg-gray-300 rounded">
            {t('cancel')}
          </button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
            {loading ? t('saving') : t('save')}
          </button>
        </div>
      </div>
    </div>
  );
}
