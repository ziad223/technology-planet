'use client';
import React, { useEffect, useState } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import { Edit, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import apiServiceCall from '@/lib/apiServiceCall';

import AddMenuModal from './AddMenuModal';
import EditMenuModal from './EditMenuModal';
import DeleteMenuModal from './DeleteMenuModal';

export default function MenusPage() {
  const t = useTranslations('menus');

  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  // 🔹 GET menus
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const res = await apiServiceCall({
          url: 'menus',
          method: 'GET',
        });

        // 🔥 مهم: data جاية جوه data
        if (res?.data?.status) {
          setMenus(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // 🔹 Columns (مطابقة للـ API)
  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    { key: 'name', header: t('name'), align: 'left' },
    { key: 'location', header: t('location'), align: 'center' },
    { key: 'url', header: t('url'), align: 'left' },
    { key: 'sort', header: t('sort'), align: 'center' },
  ];

  // 🔹 Handlers
  const handleAdd = (menu: Menu) => setMenus(prev => [menu, ...prev]);

  const handleEdit = (menu: Menu) =>
    setMenus(prev => prev.map(m => (m.id === menu.id ? menu : m)));

  const handleDelete = (menu: Menu) =>
    setMenus(prev => prev.filter(m => m.id !== menu.id));

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between mb-4">
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
        data={menus}
        loading={loading}
        emptyMessage={t('noData')}
        actions={(menu: Menu) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
              className="p-2 text-green-600"
            >
              <Edit />
            </button>
            <button
              onClick={() => {
                setSelectedMenu(menu);
                setDeleteOpen(true);
              }}
              className="p-2 text-red-600"
            >
              <Trash2 />
            </button>
          </div>
        )}
      />

      <AddMenuModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />

      <EditMenuModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        menu={selectedMenu}
        onEdit={handleEdit}
      />

      <DeleteMenuModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        menu={selectedMenu}
        onDelete={handleDelete}
      />
    </div>
  );
}
