import React from 'react';
import { getTranslations } from 'next-intl/server';
import NotificationsTable, { Notification } from './NotificationsTable';

export const metadata = {
  title: 'Notifications',
};

export default async function NotificationsPage() {
  const t = await getTranslations('Notifications');

  // بيانات افتراضية، ممكن تجيبها من API
  const notifications: Notification[] = [
    { id: '1', name: 'John Doe', notification: 'New message received', reading: 'Unread' },
    { id: '2', name: 'Jane Smith', notification: 'Task completed', reading: 'Read' }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('notifications')}</h1>
      <NotificationsTable data={notifications} />
    </div>
  );
}
