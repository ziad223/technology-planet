'use client';

import DataTable, { Column } from '@/components/shared/reusableComponents/Table';
import { useTranslations } from 'next-intl';
import AddNotificationButton from './AddNotificationButton';

export interface Notification {
  id: string;
  name: string;
  notification: string;
  reading: string;
}

interface NotificationsTableProps {
  data: Notification[];
}

export default function NotificationsTable({ data }: NotificationsTableProps) {
  const t = useTranslations('Notifications');

  const columns: Column<Notification>[] = [
    { key: 'id', header: t('table.id'), align: 'center' },
    { key: 'name', header: t('table.name'), align: 'left' },
    { key: 'notification', header: t('table.notification'), align: 'left' },
    { key: 'reading', header: t('table.reading'), align: 'center' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddNotificationButton />
      </div>
      <DataTable columns={columns} data={data} emptyMessage={t('emptyTable')} />
    </div>
  );
}
