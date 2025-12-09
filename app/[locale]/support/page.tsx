'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { ModalAddComment } from './ModalAddComment';
import { ModalEditStatus } from './ModalEditStatus';
import { ModalDeleteTicket } from './ModalDeleteTicket';

interface SupportTicket {
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
              <th className="border p-2">{t('columns.client')}</th>
              <th className="border p-2">{t('columns.address')}</th>
              <th className="border p-2">{t('columns.category')}</th>
              <th className="border p-2">{t('columns.content')}</th>
              <th className="border p-2">{t('columns.status')}</th>
              <th className="border p-2">{t('columns.comments')}</th>
              <th className="border p-2">{t('columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center p-4">{t('noData')}</td>
              </tr>
            )}
            {tickets.map((ticket, index) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{ticket.client}</td>
                <td className="border p-2">{ticket.address}</td>
                <td className="border p-2">{ticket.category}</td>
                <td className="border p-2">{ticket.content}</td>
                <td className="border p-2">{ticket.status}</td>
                <td className="border p-2">{ticket.comments}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                    onClick={() => { setSelectedTicket(ticket); setAddCommentOpen(true); }}
                  >
                    {t('actions.addComment')}
                  </button>
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => { setSelectedTicket(ticket); setEditStatusOpen(true); }}
                  >
                    {t('actions.editStatus')}
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded"
                    onClick={() => { setSelectedTicket(ticket); setDeleteOpen(true); }}
                  >
                    {t('actions.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedTicket && (
        <>
          <ModalAddComment
            isOpen={isAddCommentOpen}
            onClose={() => setAddCommentOpen(false)}
            ticket={selectedTicket}
            onSuccess={(newComment: string) => {
              setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, comments: newComment } : t));
              toast.success(t('messages.commentAdded'));
            }}
          />
          <ModalEditStatus
            isOpen={isEditStatusOpen}
            onClose={() => setEditStatusOpen(false)}
            ticket={selectedTicket}
            onSuccess={(newStatus: string) => {
              setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: newStatus } : t));
              toast.success(t('messages.statusUpdated'));
            }}
          />
          <ModalDeleteTicket
            isOpen={isDeleteOpen}
            onClose={() => setDeleteOpen(false)}
            ticket={selectedTicket}
            onSuccess={() => {
              setTickets(prev => prev.filter(t => t.id !== selectedTicket.id));
              toast.success(t('messages.ticketDeleted'));
            }}
          />
        </>
      )}
    </div>
  );
}
