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
    { id: 1, name: 'Ziad Abdalla', email: 'ziad@example.com', role: 'Admin', type: 'عميل محتمل' },
    { id: 2, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'User', type: 'عميل مهتم' },
    { id: 3, name: 'Sara Mohamed', email: 'sara@example.com', role: 'User', type: 'عميل حقيقي' },
    { id: 4, name: 'Sara Mohamed', email: 'sara@example.com', role: 'User', type: 'عميل مهتم' },
    { id: 5, name: 'Sara Mohamed', email: 'sara@example.com', role: 'User', type: 'عميل حقيقي' },
    { id: 6, name: 'Sara Mohamed', email: 'sara@example.com', role: 'User', type: 'عميل مهتم' },
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
    { key: 'type', header: t('type'), align: 'center' }
  ];

  const handleAdd = (user: any) => setUsers(prev => [...prev, user]);
  const handleEdit = (user: any) => setUsers(prev => prev.map(u => u.id === user.id ? user : u));
  const handleDelete = (user: any) => setUsers(prev => prev.filter(u => u.id !== user.id));

  // احصائيات العملاء حسب النوع
  const totalClients = users.length;
  const potentialClients = users.filter(u => u.type === 'عميل محتمل').length;
  const interestedClients = users.filter(u => u.type === 'عميل مهتم').length;
  const uninterestedClients = users.filter(u => u.type === 'عميل غير مهتم').length;
  const realClients = users.filter(u => u.type === 'عميل حقيقي').length;

  return (
    <div className="p-4 md:p-6 space-y-4">

      {/* إحصائيات العملاء */}
      <div className="flex flex-wrap gap-3">
        <div className="px-4 py-2 bg-gray-200 rounded">{t('totalClients')}: {totalClients}</div>
        <div className="px-4 py-2 bg-yellow-200 rounded">{t('potentialClients')}: {potentialClients}</div>
        <div className="px-4 py-2 bg-blue-200 rounded">{t('interestedClients')}: {interestedClients}</div>
        <div className="px-4 py-2 bg-red-200 rounded">{t('uninterestedClients')}: {uninterestedClients}</div>
        <div className="px-4 py-2 bg-green-200 rounded">{t('realClients')}: {realClients}</div>
      </div>

      {/* عنوان وزرار إضافة */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <button onClick={() => setAddOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">{t('add')}</button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        actions={(user) => (
          <div className="flex justify-center gap-2">
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
