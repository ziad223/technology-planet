'use client';

import React, { useState } from 'react';
import DataTable , {Column} from '@/components/shared/reusableComponents/Table';
import AddBannerModal, { Banner } from './AddBannerModal';
import EditBannerModal from './EditBannerModal';
import DeleteBannerModal from './DeleteBannerModal';
import { Edit, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function BannersClient() {
  const t = useTranslations('BannersPage.table');

  const initialBanners: Banner[] = [
    { id: '1', title: 'Banner 1', image: '/images/hero-1.png', link: '#', active: true },
    { id: '2', title: 'Banner 2', image: '/images/hero-1.png', link: '#', active: false },
  ];

  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [deleting, setDeleting] = useState<Banner | null>(null);

  const columns: Column<Banner>[] = [
    { key: 'title', header: t('title'), align: 'left' },
    { key: 'image', header: t('image'), align: 'center', render: (value: string) => <img src={value} className="w-20 h-12 object-cover mx-auto rounded" /> },
    { key: 'link', header: t('link'), align: 'left', render: (value: string) => <a href={value} className="text-blue-600">{value}</a> },
    { key: 'active', header: t('active'), align: 'center', render: (value: boolean) => (value ? 'Yes' : 'No') },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {t('button')}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={banners}
        actions={(banner) => (
          <div className="flex justify-center gap-2">
            <button onClick={() => setEditing(banner)} className="p-2 rounded hover:bg-gray-100">
              <Edit className="text-blue-600" />
            </button>
            <button onClick={() => setDeleting(banner)} className="p-2 rounded hover:bg-gray-100">
              <Trash2 className="text-red-600" />
            </button>
          </div>
        )}
      />

      <AddBannerModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(newBanner) => setBanners(prev => [newBanner, ...prev])}
      />

      {editing && (
        <EditBannerModal
          open={!!editing}
          banner={editing}
          onClose={() => setEditing(null)}
          onSave={(updated) => {
            setBanners(prev => prev.map(b => (b.id === updated.id ? updated : b)));
            setEditing(null);
          }}
        />
      )}

      {deleting && (
        <DeleteBannerModal
          open={!!deleting}
          banner={deleting}
          onClose={() => setDeleting(null)}
          onConfirm={() => {
            setBanners(prev => prev.filter(b => b.id !== deleting.id));
            setDeleting(null);
          }}
        />
      )}
    </div>
  );
}
