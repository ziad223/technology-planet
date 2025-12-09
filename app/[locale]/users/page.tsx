'use client';
import React, { useState } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import { useTranslations } from 'next-intl';
import { Trash2 , Edit } from 'lucide-react';

export default function UsersPage() {
  const t = useTranslations('UsersPage');

  const [users, setUsers] = useState([
    { id: 1, name: 'Ziad Abdalla', email: 'ziad@example.com', role: 'Admin' },
    { id: 2, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'User' },
    { id: 3, name: 'Sara Mohamed', email: 'sara@example.com', role: 'User' },
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    { key: 'name', header: t('name'), align: 'left' },
    { key: 'email', header: t('email'), align: 'left' },
    { key: 'role', header: t('role'), align: 'center' },
  ];

  const handleAdd = (user: any) => setUsers(prev => [...prev, user]);
  const handleEdit = (user: any) => setUsers(prev => prev.map(u => u.id === user.id ? user : u));
  const handleDelete = (user: any) => setUsers(prev => prev.filter(u => u.id !== user.id));

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <button onClick={() => setAddOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">{t('add')}</button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        actions={(user) => (
          <div className="flex justify-center gap-">
            <button onClick={() => { setSelectedUser(user); setEditOpen(true); }} className="p-2 rounded  text-green-600"><Edit/></button>
            <button onClick={() => { setSelectedUser(user); setDeleteOpen(true); }} className="p-2 rounded  text-red-600"><Trash2/></button>
          </div>
        )}
        emptyMessage={t('noData')}
      />

      {/* المودالات */}
      <AddUserModal isOpen={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <EditUserModal isOpen={editOpen} onClose={() => setEditOpen(false)} user={selectedUser} onEdit={handleEdit} />
      <DeleteUserModal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} user={selectedUser} onDelete={handleDelete} />
    </div>
  );
}
