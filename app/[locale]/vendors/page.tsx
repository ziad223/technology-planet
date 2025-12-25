'use client';
import React, { useState, useEffect } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import { useTranslations } from 'next-intl';
import { Edit, Trash2 } from 'lucide-react';
import apiServiceCall from '@/lib/apiServiceCall';
import AddVendorModal from './AddVendorModal';

export default function VendorsPage() {
  const t = useTranslations('vendors');

  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
const [addOpen, setAddOpen] = useState(false);

// دالة لإضافة مورد جديد للجدول بعد POST
const handleAdd = (vendor: any) => setVendors(prev => [...prev, vendor]);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Fetch vendors from API
  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const data = await apiServiceCall({ url: 'vendors', method: 'GET' });
        setVendors(data.data); // حسب شكل الرد { status, message, data: [...] }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    { key: 'image_url', header: t('image'), align: 'center', render: (value: string) => <img src={value} alt="" className="w-10 h-10 rounded mx-auto"/> },
    { key: 'name', header: t('name'), align: 'left' },
    { key: 'email', header: t('email'), align: 'left' },
    { key: 'phone', header: t('phone'), align: 'left' },
    { key: 'city_name', header: t('city'), align: 'left' },
    { key: 'role.name', header: t('role'), align: 'left' },
    { key: 'active', header: t('status'), align: 'center', render: (value: boolean) => value ? 'نشط' : 'غير نشط' },
  ];

  const handleEdit = (vendor: any) => setVendors(prev => prev.map(v => v.id === vendor.id ? vendor : v));
  const handleDelete = (vendor: any) => setVendors(prev => prev.filter(v => v.id !== vendor.id));

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        {/* مثال زر إضافة مورد جديد */}
<button onClick={() => setAddOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">{t('add')}</button>
      </div>

      <DataTable
        columns={columns}
        data={vendors}
        actions={(vendor) => (
          <div className="flex justify-center gap-2">
            <button onClick={() => { setSelectedVendor(vendor); setEditOpen(true); }} className="p-2 rounded text-green-600"><Edit/></button>
            <button onClick={() => { setSelectedVendor(vendor); setDeleteOpen(true); }} className="p-2 rounded text-red-600"><Trash2/></button>
          </div>
        )}
        emptyMessage={t('noData')}
      />

      <AddVendorModal isOpen={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      {/* <EditVendorModal isOpen={editOpen} onClose={() => setEditOpen(false)} vendor={selectedVendor} onEdit={handleEdit} /> */}
      {/* <DeleteVendorModal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} vendor={selectedVendor} onDelete={handleDelete} /> */}
    </div>
  );
}
