'use client';

import { useState } from 'react';
import DataTable, { Column } from '@/components/shared/reusableComponents/Table';
import { useTranslations } from 'next-intl';
import AddAdminButton from './AddAdminButton';
import EditAdminModal from './EditAdminModal';
import DeleteAdminModal from './DeleteAdminModal';
import { Trash2 , Edit } from 'lucide-react';

export interface Admin {
  id: string;
  name: string;
  email: string;
  group: string;
}

interface AdminsTableProps {
  data: Admin[];
}

export default function AdminsTable({ data }: AdminsTableProps) {
  const t = useTranslations('Admins');

  // الحالة المحلية للـ admins (نأخذها من الـ props كبداية)
  const [admins, setAdmins] = useState<Admin[]>(data || []);

  // مودالات
  const [editing, setEditing] = useState<Admin | null>(null);
  const [deleting, setDeleting] = useState<Admin | null>(null);

  // دوال التعديل والحذف
  const handleSaveEdit = (updated: Admin) => {
    setAdmins(prev => prev.map(a => (a.id === updated.id ? updated : a)));
    setEditing(null);
  };

  const handleConfirmDelete = (id: string) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
    setDeleting(null);
  };

  // عمود الكنترول: يعطي أيقونتين
  const columns: Column<Admin>[] = [
    { key: 'id', header: t('table.id'), align: 'center' },
    { key: 'name', header: t('table.name'), align: 'left' },
    { key: 'email', header: t('table.email'), align: 'left' },
    { key: 'group', header: t('table.group'), align: 'center' },
    {
      key: 'control',
      header: t('table.control'),
      align: 'center',
      render: (row: Admin) => (
        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={() => setEditing(row)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Edit className="text-green-600" />
          </button>

          <button
            onClick={() => setDeleting(row)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Trash2 className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddAdminButton
          onAdd={(newAdmin: Admin) => setAdmins(prev => [newAdmin, ...prev])}
        />
      </div>

      <DataTable columns={columns} data={admins} emptyMessage={t('emptyTable')} />

      {/* مودال التعديل */}
{editing && (
  <EditAdminModal
    open={!!editing}
    admin={editing}
    onClose={() => setEditing(null)}
    onSave={handleSaveEdit}
  />
)}

      {/* مودال الحذف */}
      {deleting && (
        <DeleteAdminModal
          open={!!deleting}
          admin={deleting}
          onClose={() => setDeleting(null)}
          onConfirm={() => handleConfirmDelete(deleting.id)}
        />
      )}
    </div>
  );
}
