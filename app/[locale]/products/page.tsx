'use client';
import React, { useState } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import { useTranslations } from 'next-intl';
import { Edit, Trash2 } from 'lucide-react';

export default function ProductsPage() {
  const t = useTranslations('ProductsPage');

  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Dell XPS 13', price: 1500, stock: 10, image: '/images/hero-1.png' },
    { id: 2, name: 'iPhone 15', price: 1200, stock: 5, image: '/images/hero-2.webp' },
    { id: 3, name: 'Headphones Sony', price: 200, stock: 15, image: '/images/hero-3.webp' },
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    { key: 'image', header: t('image'), align: 'center', render: (value: string) => <img src={value} alt="" className="w-10 h-10 rounded mx-auto"/> },
    { key: 'name', header: t('name'), align: 'left' },
    { key: 'price', header: t('price'), align: 'right' },
    { key: 'stock', header: t('stock'), align: 'center' },
  ];

  const handleAdd = (product: any) => setProducts(prev => [...prev, product]);
  const handleEdit = (product: any) => setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  const handleDelete = (product: any) => setProducts(prev => prev.filter(p => p.id !== product.id));

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <button onClick={() => setAddOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">{t('add')}</button>
      </div>

      <DataTable
        columns={columns}
        data={products}
        actions={(product) => (
          <div className="flex justify-center gap-2">
            <button onClick={() => { setSelectedProduct(product); setEditOpen(true); }} className="p-2 rounded  text-green-600"><Edit/></button>
            <button onClick={() => { setSelectedProduct(product); setDeleteOpen(true); }} className="p-2 rounded  text-red-600"><Trash2/></button>
          </div>
        )}
        emptyMessage={t('noData')}
      />

      <AddProductModal isOpen={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <EditProductModal isOpen={editOpen} onClose={() => setEditOpen(false)} product={selectedProduct} onEdit={handleEdit} />
      <DeleteProductModal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} product={selectedProduct} onDelete={handleDelete} />
    </div>
  );
}
