'use client';

import { useTranslations } from 'next-intl';
import { FaTimes } from 'react-icons/fa';
import { Admin } from './AdminsTable';

interface Props {
  open: boolean;
  admin: Admin;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteAdminModal({ open, admin, onClose, onConfirm }: Props) {
  const t = useTranslations('Admins');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">{t('deleteAdmin')}</h2>

        <p className="mb-4">
          {t('confirmDeleteMessage')} <strong>{admin.name}</strong>?
        </p>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            {t('cancel')}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {t('delete')}
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute right-6 top-5 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>
      </div>
    </div>
  );
}
