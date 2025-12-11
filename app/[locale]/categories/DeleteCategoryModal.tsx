'use client';
import React from 'react';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: { id: number; name: string; description: string } | null;
  onDelete: (category: { id: number; name: string; description: string }) => void;
  t: any;
}

export default function DeleteCategoryModal({ isOpen, onClose, category, onDelete, t }: DeleteCategoryModalProps) {
  if (!isOpen || !category) return null;

  const handleDelete = () => {
    onDelete(category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">{t('deleteModal.title')}</h2>
        <p>{t('deleteModal.message')}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('deleteModal.cancel')}</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">{t('deleteModal.confirm')}</button>
        </div>
      </div>
    </div>
  );
}
