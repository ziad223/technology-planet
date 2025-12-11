'use client';
import React, { useState, useEffect } from 'react';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: { id: number; name: string; description: string } | null;
  onEdit: (category: { id: number; name: string; description: string }) => void;
  t: any;
}

export default function EditCategoryModal({ isOpen, onClose, category, onEdit, t }: EditCategoryModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  if (!isOpen || !category) return null;

  const handleSubmit = () => {
    onEdit({ ...category, name, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">{t('editModal.title')}</h2>
        <input
          type="text"
          placeholder={t('editModal.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          placeholder={t('editModal.description')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('editModal.cancel')}</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">{t('editModal.submit')}</button>
        </div>
      </div>
    </div>
  );
}
