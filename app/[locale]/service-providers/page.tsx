import React from 'react';
import { getTranslations } from 'next-intl/server';
import AdminsTable, { Admin } from './AdminsTable';

export const metadata = {
  title: 'Admins',
};

export default async function AdminsPage() {
  const t = await getTranslations('Admins');

  // بيانات مؤقتة
  const admins: Admin[] = [
    { id: '1', name: 'Ziad Abdalla', email: 'ziad@example.com', group: 'Super Admin' },
    { id: '2', name: 'Ahmed Ali', email: 'ahmed@example.com', group: 'Editor' }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('admins')}</h1>
      <AdminsTable data={admins} />
    </div>
  );
}
