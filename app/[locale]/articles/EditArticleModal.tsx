'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  article: any;
  onEdit: (updatedArticle: any) => void;
}

export default function EditArticleModal({ isOpen, onClose, article, onEdit }: Props) {
  const t = useTranslations('ArticlesPage');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setAuthor(article.author);
      setDate(article.date);
    }
  }, [article]);

  if (!isOpen || !article) return null;

  const handleSubmit = () => {
    onEdit({ ...article, title, author, date });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t('edit')}</h2>
        <input type="text" placeholder={t('title')} value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
        <input type="text" placeholder={t('author')} value={author} onChange={e => setAuthor(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
        <input type="date" placeholder={t('date')} value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 mb-4 border rounded"/>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('cancel')}</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">{t('save')}</button>
        </div>
      </div>
    </div>
  );
}
