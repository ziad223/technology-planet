'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { ModalAddComment } from '../support/ModalAddComment';
import { ModalEditStatus } from '../support/ModalEditStatus';
import { ModalDeleteMessage } from './ModalDeleteMessage';

interface Message {
  id: string;
  sender: string;
  email: string;
  content: string;
  status: string;
  comments: string;
}

export default function MessagesPage() {
  const t = useTranslations('MessagesPage');
  const [messages, setMessages] = useState<Message[]>([]); // يمكن استدعاؤه من API
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const [isAddCommentOpen, setAddCommentOpen] = useState(false);
  const [isEditStatusOpen, setEditStatusOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">{t('columns.number')}</th>
              <th className="border p-2">{t('columns.sender')}</th>
              <th className="border p-2">{t('columns.email')}</th>
              <th className="border p-2">{t('columns.content')}</th>
              <th className="border p-2">{t('columns.status')}</th>
              <th className="border p-2">{t('columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4">{t('noData')}</td>
              </tr>
            )}
            {messages.map((msg, index) => (
              <tr key={msg.id} className="hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{msg.sender}</td>
                <td className="border p-2">{msg.email}</td>
                <td className="border p-2">{msg.content}</td>
                <td className="border p-2">{msg.status}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                    onClick={() => { setSelectedMessage(msg); setAddCommentOpen(true); }}
                  >
                    {t('actions.addComment')}
                  </button>
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => { setSelectedMessage(msg); setEditStatusOpen(true); }}
                  >
                    {t('actions.editStatus')}
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded"
                    onClick={() => { setSelectedMessage(msg); setDeleteOpen(true); }}
                  >
                    {t('actions.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMessage && (
        <>
          <ModalAddComment
            isOpen={isAddCommentOpen}
            onClose={() => setAddCommentOpen(false)}
            ticket={selectedMessage}
            onSuccess={(newComment: string) => {
              setMessages(prev => prev.map(m => m.id === selectedMessage.id ? { ...m, comments: newComment } : m));
              toast.success(t('messages.commentAdded'));
            }}
          />
          <ModalEditStatus
            isOpen={isEditStatusOpen}
            onClose={() => setEditStatusOpen(false)}
            ticket={selectedMessage}
            onSuccess={(newStatus: string) => {
              setMessages(prev => prev.map(m => m.id === selectedMessage.id ? { ...m, status: newStatus } : m));
              toast.success(t('messages.statusUpdated'));
            }}
          />
          <ModalDeleteMessage
            isOpen={isDeleteOpen}
            onClose={() => setDeleteOpen(false)}
            ticket={selectedMessage}
            onSuccess={() => {
              setMessages(prev => prev.filter(m => m.id !== selectedMessage.id));
              toast.success(t('messages.messageDeleted'));
            }}
          />
        </>
      )}
    </div>
  );
}
