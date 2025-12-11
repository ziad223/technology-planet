'use client';
import React, { useState } from 'react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (category: { id: number; name: string; description: string }) => void;
  t: any;
}

export default function AddCategoryModal({ isOpen, onClose, onAdd, t }: AddCategoryModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name || !description) return;
    onAdd({ id: Date.now(), name, description });
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">{t('addModal.title')}</h2>
        <input
          type="text"
          placeholder={t('addModal.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          placeholder={t('addModal.description')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('addModal.cancel')}</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">{t('addModal.submit')}</button>
        </div>
      </div>
    </div>
  );
}
