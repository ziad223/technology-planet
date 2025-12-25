'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import DataTable from '@/components/shared/reusableComponents/Table';
import apiServiceCall from '@/lib/apiServiceCall';

import  {ModalAddComment}  from './ModalAddComment';
import { ModalDeleteMessage } from './ModalDeleteMessage';
import { Trash2 } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  email: string;
  content: string;
  status: string;
  comments: string;
}

const EMPTY_MESSAGE: Message = {
  id: '',
  sender: '',
  email: '',
  content: '',
  status: 'new',
  comments: '',
};

export default function MessagesPage() {
  const t = useTranslations('MessagesPage');

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const [addCommentOpen, setAddCommentOpen] = useState(false);
  const [editStatusOpen, setEditStatusOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await apiServiceCall({
        url: 'contact-us',
        method: 'GET',
      });

      setMessages(
        res.data.map((item: any) => ({
          id: String(item.id),
          sender: item.name,
          email: item.email,
          content: item.message,
          status: 'new',
          comments: '',
        }))
      );
    } catch (error) {
      console.error(error);
      toast.error(t('messages.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const columns = [
    { key: 'id', header: t('columns.number'), align: 'center' },
    { key: 'sender', header: t('columns.sender'), align: 'left' },
    { key: 'email', header: t('columns.email'), align: 'left' },
    { key: 'content', header: t('columns.content'), align: 'left' },
    { key: 'status', header: t('columns.status'), align: 'center' },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>

        {/* ✅ زر الإضافة */}
        <button
          onClick={() => {
            setSelectedMessage(EMPTY_MESSAGE);
            setAddCommentOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {t('add')}
        </button>
      </div>

      {/* Table */}
      <DataTable
        loading={loading}
        columns={columns}
        data={messages}
        emptyMessage={t('noData')}
        actions={(message) => (
          <div className="flex justify-center gap-2">
         

            <button
              onClick={() => {
                setSelectedMessage(message);
                setDeleteOpen(true);
              }}
              className="p-2 text-red-600"
            >
              <Trash2/>
            </button>
          </div>
        )}
      />

      {/* Modals */}
      {selectedMessage && (
        <>
          <ModalAddComment
            isOpen={addCommentOpen}
            onClose={() => setAddCommentOpen(false)}
            ticket={selectedMessage}
            onSuccess={(newComment: string) => {
              // لو إضافة جديدة
              if (!selectedMessage.id) {
                fetchMessages();
              } else {
                setMessages(prev =>
                  prev.map(m =>
                    m.id === selectedMessage.id
                      ? { ...m, comments: newComment }
                      : m
                  )
                );
              }
              toast.success(t('messages.commentAdded'));
            }}
          />


          <ModalDeleteMessage
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            ticket={selectedMessage}
            onSuccess={() => {
              setMessages(prev =>
                prev.filter(m => m.id !== selectedMessage.id)
              );
              toast.success(t('messages.messageDeleted'));
            }}
          />
        </>
      )}
    </div>
  );
}
