import React from 'react';
import { getTranslations } from 'next-intl/server';
import AdminsTable, { Admin } from './AdminsTable';

export const metadata = {
  title: 'Admins',
};

export default async function AdminsPage() {
  const t = await getTranslations('Admins');

  // بيانات الأدمينز مع صور
  const admins: Admin[] = [
    { id: '1', name: 'Ziad Abdalla', email: 'ziad@example.com', group: 'Super Admin', avatar: '/images/hero-1.png' },
    { id: '2', name: 'Ahmed Ali', email: 'ahmed@example.com', group: 'Editor', avatar: '/images/hero-2.webp' },
    { id: '3', name: 'Sara Mohamed', email: 'sara@example.com', group: 'Editor', avatar: '/images/hero-3.webp' },
    { id: '4', name: 'Omar Hassan', email: 'omar@example.com', group: 'Admin', avatar: '/images/hero-4.webp' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('admins')}</h1>
      <AdminsTable data={admins} />
    </div>
  );
}
