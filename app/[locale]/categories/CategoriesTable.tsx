'use client';

import DataTable, { Column } from '@/components/shared/reusableComponents/Table';
import { Pencil, Trash2 } from 'lucide-react';
import AddCategoryButton from './AddCategoryButton';
import EditCategoryModal from './/EditCategoryModal';
import DeleteCategoryModal from './/DeleteCategoryModal';
import React, { useState } from 'react';

export interface Category {
  id: string;
  name: string;
}

interface CategoriesTableProps {
  data: Category[];
  t: any;
}

export default function CategoriesTable({ data, t }: CategoriesTableProps) {
  const [editItem, setEditItem] = useState<Category | null>(null);
  const [deleteItem, setDeleteItem] = useState<Category | null>(null);

  const columns: Column<Category>[] = [
    { key: 'id', header: t('table.id'), align: 'center' },
    { key: 'name', header: t('table.name'), align: 'left' },
    {
      key: 'actions',
      header: t('table.actions'),
      align: 'center',
      render: (row: Category) => (
        <div className="flex justify-center gap-2">
          <button className="text-blue-600" onClick={() => setEditItem(row)}>
            <Pencil size={18} />
          </button>
          <button className="text-red-600" onClick={() => setDeleteItem(row)}>
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddCategoryButton t={t} />
      </div>

      <DataTable columns={columns} data={data} emptyMessage={t('emptyTable')} />

      <EditCategoryModal open={!!editItem} onClose={() => setEditItem(null)} item={editItem} t={t} />
      <DeleteCategoryModal open={!!deleteItem} onClose={() => setDeleteItem(null)} item={deleteItem} t={t} />
    </div>
  );
}
