'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: any) => void;
}

export default function AddUserModal({ isOpen, onClose, onAdd }: Props) {
  const t = useTranslations('UsersPage');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onAdd({ id: Date.now(), name, email, role });
    setName(''); setEmail(''); setRole('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t('add')}</h2>
        <input type="text" placeholder={t('name')} value={name} onChange={e => setName(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
        <input type="email" placeholder={t('email')} value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
        <input type="text" placeholder={t('role')} value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded"/>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('cancel')}</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">{t('add')}</button>
        </div>
      </div>
    </div>
  );
}
