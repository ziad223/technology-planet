'use client';
import React, { useState, useEffect } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import { useTranslations } from 'next-intl';
import { Edit, Trash2 } from 'lucide-react';
import apiServiceCall from '@/lib/apiServiceCall'; // استدعاء الـ service

export default function ProductsPage() {
  const t = useTranslations('ProductsPage');

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await apiServiceCall({ url: 'products', method: 'GET' });
        setProducts(data.data); // حسب شكل الرد API { status, message, data: [...] }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    { key: 'image_url', header: t('image'), align: 'center', render: (value: string) => <img src={value} alt="" className="w-10 h-10 rounded mx-auto"/> },
    { key: 'name', header: t('name'), align: 'left' },
    { key: 'category_name', header: t('category'), align: 'left' },
    { key: 'created_at', header: t('createdAt'), align: 'center', render: (value: string) => new Date(value).toLocaleDateString() },
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
        loading={loading}
        actions={(product) => (
          <div className="flex justify-center gap-2">
            <button onClick={() => { setSelectedProduct(product); setEditOpen(true); }} className="p-2 rounded text-green-600"><Edit/></button>
            <button onClick={() => { setSelectedProduct(product); setDeleteOpen(true); }} className="p-2 rounded text-red-600"><Trash2/></button>
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
