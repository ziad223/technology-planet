'use client';
import React, { useEffect, useState } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import { useTranslations } from 'next-intl';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';
import AddCategoryModal from './AddCategoryModal';

export interface Category {
  id: number;
  name: string;
  status: string;
  parent_id: number | null;
  cover_url: string;
  children_count: number;
  created_at: string;
}

export default function CategoriesPage() {
  const t = useTranslations('CategoriesPage');

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // 🔹 Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await apiServiceCall({ url: 'categories', method: 'GET' });
        if (res?.data) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error('Error fetching categories', error);
        toast.error(t('fetchError'));
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [t]);

  // 🔹 Columns
  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    { 
      key: 'cover_url', 
      header: t('image'), 
      align: 'center', 
      render: (value: string) => value ? <img src={value} alt="" className="w-12 h-12 rounded object-cover mx-auto"/> : '-' 
    },
    { key: 'name', header: t('name'), align: 'left' },
    { 
      key: 'status', 
      header: t('status'), 
      align: 'center',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded text-sm ${value === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {value}
        </span>
      )
    },
    { key: 'children_count', header: t('childrenCount'), align: 'center' },
    { 
      key: 'created_at', 
      header: t('createdAt'), 
      align: 'center', 
      render: (value: string) => new Date(value).toLocaleDateString() 
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
         <button
         
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {t('add')}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        loading={loading}
        emptyMessage={t('noData')}
        actions={(category: Category) => (
          <div className="flex justify-center gap-2">
            <button onClick={() => { setSelectedCategory(category); setEditOpen(true); }} className="p-2 text-green-600">
              <Edit />
            </button>
            <button onClick={() => { setSelectedCategory(category); setDeleteOpen(true); }} className="p-2 text-red-600">
              <Trash2 />
            </button>
          </div>
        )}
      />

      <AddCategoryModal/>
      {/* <EditCategoryModal ... /> */}
      {/* <DeleteCategoryModal ... /> */}
    </div>
  );
}
