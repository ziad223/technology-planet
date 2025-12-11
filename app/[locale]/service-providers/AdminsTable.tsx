'use client';

import { useState } from 'react';
import DataTable, { Column } from '@/components/shared/reusableComponents/Table';
import { useTranslations } from 'next-intl';
import AddAdminButton from './AddAdminButton';
import EditAdminModal from './EditAdminModal';
import DeleteAdminModal from './DeleteAdminModal';
import { Trash2 , Edit } from 'lucide-react';
import Image from 'next/image';

export interface Admin {
  id: string;
  name: string;
  email: string;
  group: string;
  avatar: string;
}

interface AdminsTableProps {
  data: Admin[];
}

export default function AdminsTable({ data }: AdminsTableProps) {
  const t = useTranslations('Admins');

  const [admins, setAdmins] = useState<Admin[]>(data);
  const [editing, setEditing] = useState<Admin | null>(null);
  const [deleting, setDeleting] = useState<Admin | null>(null);

  const handleSaveEdit = (updated: Admin) => {
    setAdmins(prev => prev.map(a => (a.id === updated.id ? updated : a)));
    setEditing(null);
  };

  const handleConfirmDelete = (id: string) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
    setDeleting(null);
  };

  const columns: Column<Admin>[] = [
    { key: 'id', header: t('table.id'), align: 'center' },
    
    {
      key: 'avatar',
      header: t('table.avatar'),
      align: 'center',
      render: (row: Admin) => (
        <Image 
          src = '/images/hero-2.webp'
          width={40}
          height={40}
          alt={row.name} 
          className="w-10 h-10 rounded-full object-cover border border-gray-200 mx-auto" 
        />
      ),
    },
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

      {editing && (
        <EditAdminModal
          open={!!editing}
          admin={editing}
          onClose={() => setEditing(null)}
          onSave={handleSaveEdit}
        />
      )}

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
