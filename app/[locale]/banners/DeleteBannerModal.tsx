'use client';

import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Banner } from './BannersClient';

interface Props {
  open: boolean;
  banner: Banner;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteBannerModal({ open, banner, onClose, onConfirm }: Props) {
  const t = useTranslations('BannersPage.delete');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-sm p-6 relative">
        <h2 className="text-xl font-bold mb-4">{t('title')}</h2>
        <p>{t('confirm')} <strong>{banner.title}</strong>?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            {t('cancel')}
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">
            {t('delete')}
          </button>
        </div>
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500">
          <FaTimes />
        </button>
      </div>
    </div>
  );
}
