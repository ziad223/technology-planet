'use client';
import React, { useState, useEffect } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import { useTranslations } from 'next-intl';
import { Edit, Trash2 } from 'lucide-react';
import apiServiceCall from '@/lib/apiServiceCall';

export interface Category {
  id: number;
  name: string;
  description: string;
}

export default function CategoriesPage() {
  const t = useTranslations('Categories');

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // 🔹 جلب البيانات من API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await apiServiceCall({ url: 'categories', method: 'GET' });
        if (res?.data) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error('Error fetching categories', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    { key: 'name', header: t('name'), align: 'left' },
    { key: 'description', header: t('description'), align: 'left' },
  ];

  // 🔹 دوال CRUD
  const handleAdd = (category: Category) => setCategories(prev => [category, ...prev]);
  const handleEdit = (category: Category) => setCategories(prev => prev.map(c => c.id === category.id ? category : c));
  const handleDelete = (category: Category) => setCategories(prev => prev.filter(c => c.id !== category.id));

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <button onClick={() => setAddOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
          {t('add')}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        actions={(category: Category) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => { setSelectedCategory(category); setEditOpen(true); }}
              className="p-2 rounded text-green-600"
            >
              <Edit />
            </button>
            <button
              onClick={() => { setSelectedCategory(category); setDeleteOpen(true); }}
              className="p-2 rounded text-red-600"
            >
              <Trash2 />
            </button>
          </div>
        )}
        emptyMessage={t('noData')}
      />

      <AddCategoryModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
        t={t}
      />
      <EditCategoryModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        category={selectedCategory}
        onEdit={handleEdit}
        t={t}
      />
      <DeleteCategoryModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        category={selectedCategory}
        onDelete={handleDelete}
        t={t}
      />
    </div>
  );
}
