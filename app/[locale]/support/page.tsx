'use client';
import React, { useState } from 'react';
import DataTable, { Column } from '@/components/shared/reusableComponents/Table';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { Edit, Trash2, MessageSquare, Plus } from 'lucide-react';

export interface SupportTicket {
  id: string;
  client: string;
  address: string;
  category: string;
  content: string;
  status: string;
  comments: string;
}

export default function SupportPage() {
  const t = useTranslations('SupportPage');
  const [tickets, setTickets] = useState<SupportTicket[]>([]); // يمكن استدعاؤه من API
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // States for modals
  const [isAddTicketOpen, setAddTicketOpen] = useState(false);
  const [isAddCommentOpen, setAddCommentOpen] = useState(false);
  const [isEditStatusOpen, setEditStatusOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  // States للحقول في مودال إضافة تذكرة
  const [newClient, setNewClient] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newContent, setNewContent] = useState('');

  const columns: Column<SupportTicket>[] = [
    { key: 'id', header: t('columns.number'), align: 'center' },
    { key: 'client', header: t('columns.client'), align: 'left' },
    { key: 'address', header: t('columns.address'), align: 'left' },
    { key: 'category', header: t('columns.category'), align: 'left' },
    { key: 'content', header: t('columns.content'), align: 'left' },
    { key: 'status', header: t('columns.status'), align: 'center' },
    { key: 'comments', header: t('columns.comments'), align: 'center' },
  ];

  const handleAddTicket = () => {
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      client: newClient,
      address: newAddress,
      category: newCategory,
      content: newContent,
      status: 'New',
      comments: '',
    };
    setTickets(prev => [...prev, newTicket]);
    toast.success(t('messages.ticketAdded'));

    // إعادة تعيين الحقول وإغلاق المودال
    setNewClient('');
    setNewAddress('');
    setNewCategory('');
    setNewContent('');
    setAddTicketOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <button
          onClick={() => setAddTicketOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={18} />
          {t('actions.addTicket')}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={tickets}
        emptyMessage={t('noData')}
        actions={(ticket) => (
          <div className="flex gap-2 justify-center">
            <button
              className="p-2 bg-blue-600 text-white rounded"
              onClick={() => { setSelectedTicket(ticket); setAddCommentOpen(true); }}
            >
              <MessageSquare size={18} />
            </button>
            <button
              className="p-2 bg-yellow-500 text-white rounded"
              onClick={() => { setSelectedTicket(ticket); setEditStatusOpen(true); }}
            >
              <Edit size={18} />
            </button>
            <button
              className="p-2 bg-red-600 text-white rounded"
              onClick={() => { setSelectedTicket(ticket); setDeleteOpen(true); }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      />

      {/* مودال إضافة تذكرة جديدة */}
      {isAddTicketOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{t('actions.addTicket')}</h2>
            <form className="space-y-3" onSubmit={e => { e.preventDefault(); handleAddTicket(); }}>
              <input
                className="w-full p-2 border rounded"
                placeholder={t('fields.client')}
                value={newClient}
                onChange={e => setNewClient(e.target.value)}
                required
              />
              <input
                className="w-full p-2 border rounded"
                placeholder={t('fields.address')}
                value={newAddress}
                onChange={e => setNewAddress(e.target.value)}
                required
              />
              <input
                className="w-full p-2 border rounded"
                placeholder={t('fields.category')}
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                required
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder={t('fields.content')}
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setAddTicketOpen(false)} className="px-4 py-2 bg-gray-300 rounded">{t('actions.cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{t('actions.add')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* المودالات الأخرى (AddComment, EditStatus, DeleteTicket) */}
      {/* يمكن إضافتها بنفس الطريقة أو استدعاؤها كمكونات منفصلة */}
    </div>
  );
}
