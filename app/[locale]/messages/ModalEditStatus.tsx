'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ticket: { id: string; status: string };
  onSuccess: (newStatus: string) => void;
}

interface FormValues {
  status: string;
}

export function ModalEditStatus({ isOpen, onClose, ticket, onSuccess }: Props) {
  const t = useTranslations('MessagesPage');
  const { register, handleSubmit } = useForm<FormValues>({ defaultValues: { status: ticket.status } });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const token = localStorage.getItem('token');
      return await apiServiceCall({
        url: `messages/${ticket.id}/status`,
        method: 'PATCH',
        body: { status: data.status },
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res: any) => {
      toast.success(res.message || t('messages.statusUpdated'));
      onSuccess(res.status);
      onClose();
    },
    onError: (err: any) => toast.error(err?.message || 'Error'),
  });

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => mutation.mutate(data);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t('actions.editStatus')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <select {...register('status')} className="border p-2 rounded w-full">
            <option value="open">{t('status.open')}</option>
            <option value="in_progress">{t('status.inProgress')}</option>
            <option value="closed">{t('status.closed')}</option>
          </select>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('modal.cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded">{t('actions.editStatus')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
