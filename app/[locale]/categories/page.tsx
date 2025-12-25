'use client';
import React, { useState, useEffect } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import { useTranslations } from 'next-intl';
import { MessageSquarePlus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';

import { ModalAddComment } from '../support/ModalAddComment';
import { ModalEditStatus } from '../support/ModalEditStatus';
import { ModalDeleteMessage } from './ModalDeleteMessage';

export interface Message {
  id: number;
  sender: string;
  email: string;
  content: string;
  status: string;
  comments: string;
}

export default function MessagesPage() {
  const t = useTranslations('MessagesPage');

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // 🔹 جلب الرسائل من API (نفس CategoriesPage)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await apiServiceCall({ url: 'contact-us', method: 'GET' });

        if (res?.data) {
          setMessages(
            res.data.map((item: any) => ({
              id: item.id,
              sender: item.name,
              email: item.email,
              content: item.message,
              status: 'new',
              comments: '',
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching messages', error);
        toast.error(t('messages.fetchError'));
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [t]);

  // 🔹 Columns (زي Categories)
  const columns = [
    { key: 'id', header: t('columns.number'), align: 'center' },
    { key: 'sender', header: t('columns.sender'), align: 'left' },
    { key: 'email', header: t('columns.email'), align: 'left' },
    { key: 'content', header: t('columns.content'), align: 'left' },
    { key: 'status', header: t('columns.status'), align: 'center' },
  ];

  // 🔹 CRUD Handlers (نفس الأسلوب)
  const handleAddComment = (comment: string) => {
    if (!selectedMessage) return;
    setMessages(prev =>
      prev.map(m =>
        m.id === selectedMessage.id ? { ...m, comments: comment } : m
      )
    );
    toast.success(t('messages.commentAdded'));
  };

  const handleEditStatus = (status: string) => {
    if (!selectedMessage) return;
    setMessages(prev =>
      prev.map(m =>
        m.id === selectedMessage.id ? { ...m, status } : m
      )
    );
    toast.success(t('messages.statusUpdated'));
  };

  const handleDelete = (message: Message) => {
    setMessages(prev => prev.filter(m => m.id !== message.id));
    toast.success(t('messages.messageDeleted'));
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        loading={loading}
        emptyMessage={t('noData')}
        actions={(message: Message) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setSelectedMessage(message);
                setAddOpen(true);
              }}
              className="p-2 rounded text-blue-600"
            >
              <MessageSquarePlus />
            </button>

            <button
              onClick={() => {
                setSelectedMessage(message);
                setEditOpen(true);
              }}
              className="p-2 rounded text-yellow-600"
            >
              <Edit />
            </button>

            <button
              onClick={() => {
                setSelectedMessage(message);
                setDeleteOpen(true);
              }}
              className="p-2 rounded text-red-600"
            >
              <Trash2 />
            </button>
          </div>
        )}
      />

      <ModalAddComment
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        ticket={selectedMessage}
        onSuccess={handleAddComment}
      />

      <ModalEditStatus
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        ticket={selectedMessage}
        onSuccess={handleEditStatus}
      />

      <ModalDeleteMessage
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        ticket={selectedMessage}
        onSuccess={() => selectedMessage && handleDelete(selectedMessage)}
      />
    </div>
  );
}
