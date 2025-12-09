'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ticket: { id: string };
  onSuccess: () => void;
}

export function ModalDeleteTicket({ isOpen, onClose, ticket, onSuccess }: Props) {
  const t = useTranslations('SupportPage');

  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      return await apiServiceCall({
        url: `support/${ticket.id}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success(t('messages.ticketDeleted'));
      onSuccess();
      onClose();
    },
    onError: (err: any) => toast.error(err?.message || 'Error'),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{t('actions.delete')}</h2>
        <p className="mb-4">{t('messages.confirmDelete')}</p>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('modal.cancel')}</button>
          <button type="button" onClick={() => mutation.mutate()} className="px-4 py-2 bg-red-600 text-white rounded">{t('actions.delete')}</button>
        </div>
      </div>
    </div>
  );
}
