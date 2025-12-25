'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast , ToastContainer } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ModalAddComment({ isOpen, onClose, onSuccess }: Props) {
  const t = useTranslations('SupportPage');

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiServiceCall({
        url: 'contact-us',
        method: 'POST',
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        },
      });
    },
    onSuccess: (res: any) => {
      toast.success(res.message || t('messages.commentAdded'));
      reset();
     setTimeout(() =>{
      onClose()
     } , 800)
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Something went wrong');
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => mutation.mutate(data);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <ToastContainer/>
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {t('actions.add')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder={t('columns.client')}
            {...register('name', { required: true })}
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Phone"
            {...register('phone', { required: true })}
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder={t('columns.content')}
            {...register('message', { required: true })}
            className="w-full p-2 border rounded min-h-[100px]"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              {t('modal.cancel')}
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {t('actions.add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
