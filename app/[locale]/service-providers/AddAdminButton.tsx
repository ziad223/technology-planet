'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FaTimes } from 'react-icons/fa';

export default function AddAdminButton() {
  const t = useTranslations('Admins');
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {t('addAdmin')}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-bold mb-4">{t('addAdmin')}</h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder={t('table.name')}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder={t('table.email')}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder={t('table.group')}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                >
                  {t('cancel')}
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {t('save')}
                </button>
              </div>
            </form>

            <button
              onClick={() => setOpen(false)}
              className={`absolute ${locale === 'en' ? 'right-6 top-7' : 'left-6 top-7'} text-gray-500 hover:text-gray-700`}
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
