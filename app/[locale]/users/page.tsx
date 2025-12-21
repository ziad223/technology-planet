'use client';

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import { useTranslations } from 'next-intl';
import { Trash2, Edit } from 'lucide-react';
import apiServiceCall from '@/lib/apiServiceCall';

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  city_name: string;
  type: string;
  active: boolean;
}

export default function UsersPage() {
  const t = useTranslations('UsersPage');

  const [users, setUsers] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Client | null>(null);

  // 🔹 جلب العملاء من API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await apiServiceCall({
          url: 'clients',
          method: 'GET',
        });

        if (res?.data) {
          setUsers(res.data);
        }
      } catch (error) {
        console.error('Error fetching clients', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // 🔹 الأعمدة (keys متوافقة مع API)
  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    { key: 'name', header: t('name'), align: 'left' },
    { key: 'email', header: t('email'), align: 'left' },
    { key: 'phone', header: t('phone'), align: 'center' },
    { key: 'city_name', header: t('city'), align: 'center' },
    {
      key: 'type',
      header: t('type'),
      align: 'center',
      render: (value: string) =>
        value === 'client' ? t('client') : t('lead'),
    },
    {
      key: 'active',
      header: t('status'),
      align: 'center',
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {value ? t('active') : t('inactive')}
        </span>
      ),
    },
  ];

  // 🔹 إحصائيات
  const totalClients = users.length;
  const activeClients = users.filter(u => u.active).length;
  const inactiveClients = users.filter(u => !u.active).length;

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* الإحصائيات */}
      <div className="flex flex-wrap gap-3">
        <div className="px-4 py-2 bg-gray-200 rounded">
          {t('totalClients')}: {totalClients}
        </div>
        <div className="px-4 py-2 bg-green-200 rounded">
          {t('active')}: {activeClients}
        </div>
        <div className="px-4 py-2 bg-red-200 rounded">
          {t('inactive')}: {inactiveClients}
        </div>
      </div>

      {/* العنوان */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {t('add')}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        actions={(user) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setSelectedUser(user);
                setEditOpen(true);
              }}
              className="p-2 text-green-600"
            >
              <Edit />
            </button>
            <button
              onClick={() => {
                setSelectedUser(user);
                setDeleteOpen(true);
              }}
              className="p-2 text-red-600"
            >
              <Trash2 />
            </button>
          </div>
        )}
        emptyMessage={t('noData')}
      />

      {/* المودالات */}
      <AddUserModal isOpen={addOpen} onClose={() => setAddOpen(false)}   onAdd={(newUser) => {
    setUsers(prev => [newUser, ...prev]);
  }} />
      <EditUserModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        user={selectedUser}
         onEdit={(updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  }}
      />
      <DeleteUserModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        user={selectedUser}
         onDeleted={(deletedUserId) => {
    setUsers(prev => prev.filter(u => u.id !== deletedUserId));
  }}
      />
    </div>
  );
}
