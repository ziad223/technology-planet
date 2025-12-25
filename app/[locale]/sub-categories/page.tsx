'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Edit, Trash2 } from 'lucide-react';

import DataTable from '@/components/shared/reusableComponents/Table';
import apiServiceCall from '@/lib/apiServiceCall';

import AddSubcategoryModal from './AddSubcategoryModal';
// import EditSubcategoryModal from './EditSubcategoryModal';
// import DeleteSubcategoryModal from './DeleteSubcategoryModal';

export default function SubcategoriesPage() {
  const t = useTranslations('SubcategoriesPage');

  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false); // 🔹 state لفتح المودال
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // 🔹 Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const res = await apiServiceCall({
          url: 'subcategories',
          method: 'GET',
        });

        setSubcategories(res?.data || []);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  // 🔹 Columns
  const columns = [
    {
      key: 'id',
      header: t('id'),
      align: 'center',
    },
    {
      key: 'cover_url',
      header: t('image'),
      align: 'center',
      render: (value: string) =>
        value ? (
          <img
            src={value}
            alt=""
            className="w-12 h-12 rounded object-cover mx-auto"
          />
        ) : (
          '-'
        ),
    },
    {
      key: 'name',
      header: t('name'),
      align: 'left',
    },
    {
      key: 'status',
      header: t('status'),
      align: 'center',
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            value === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'children_count',
      header: t('childrenCount'),
      align: 'center',
    },
    {
      key: 'created_at',
      header: t('createdAt'),
      align: 'center',
      render: (value: string) =>
        new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {t('title')}
        </h1>

        {/* زر الإضافة */}
        <button
          onClick={() => setAddOpen(true)} // 🔹 فتح المودال عند الضغط
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {t('add')}
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={subcategories}
        actions={(item) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setSelectedItem(item);
                setEditOpen(true);
              }}
              className="p-2 text-green-600"
            >
              <Edit />
            </button>

            <button
              onClick={() => {
                setSelectedItem(item);
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

      {/* مودال الإضافة */}
      <AddSubcategoryModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(newSubcategory) =>
          setSubcategories((prev) => [...prev, newSubcategory])
        }
      />

      {/* مودالات لاحقًا */}
      {/* 
      <EditSubcategoryModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        item={selectedItem}
        onEdit={(updated) =>
          setSubcategories(prev =>
            prev.map(i => i.id === updated.id ? updated : i)
          )
        }
      />

      <DeleteSubcategoryModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        item={selectedItem}
        onDelete={(item) =>
          setSubcategories(prev =>
            prev.filter(i => i.id !== item.id)
          )
        }
      />
      */}
    </div>
  );
}
