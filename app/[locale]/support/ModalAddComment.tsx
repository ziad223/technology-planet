'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ticket: { id: string; comments: string };
  onSuccess: (newComment: string) => void;
}

interface FormValues {
  comment: string;
}

export function ModalAddComment({ isOpen, onClose, ticket, onSuccess }: Props) {
  const t = useTranslations('SupportPage');
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const token = localStorage.getItem('token');
      const body = { comment: data.comment };
      return await apiServiceCall({
        url: `support/${ticket.id}/comment`,
        method: 'POST',
        body,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res: any) => {
      toast.success(res.message || t('messages.commentAdded'));
      onSuccess(res.comment);
      reset();
      onClose();
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Error');
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => mutation.mutate(data);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t('actions.addComment')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <textarea
            {...register('comment', { required: true })}
            placeholder={t('columns.comments')}
            className="border p-2 rounded w-full"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('modal.cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{t('actions.addComment')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
