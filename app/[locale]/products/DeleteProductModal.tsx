'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onDelete: (product: any) => void;
}

export default function DeleteProductModal({ isOpen, onClose, product, onDelete }: Props) {
  const t = useTranslations('ProductsPage');

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{t('delete')}</h2>
        <p className="mb-4">{t('deleteMessage', { name: product.name })}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('cancel')}</button>
          <button onClick={() => { onDelete(product); onClose(); }} className="px-4 py-2 bg-red-600 text-white rounded">{t('delete')}</button>
        </div>
      </div>
    </div>
  );
}
