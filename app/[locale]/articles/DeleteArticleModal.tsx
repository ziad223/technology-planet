'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  article: any;
  onDelete: (article: any) => void;
}

export default function DeleteArticleModal({ isOpen, onClose, article, onDelete }: Props) {
  const t = useTranslations('ArticlesPage');

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{t('delete')}</h2>
        <p className="mb-4">{t('deleteMessage', { title: article.title })}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('cancel')}</button>
          <button onClick={() => { onDelete(article); onClose(); }} className="px-4 py-2 bg-red-600 text-white rounded">{t('delete')}</button>
        </div>
      </div>
    </div>
  );
}
