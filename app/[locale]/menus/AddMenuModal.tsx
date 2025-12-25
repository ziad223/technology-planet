'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (menu: Menu) => void;
}

interface Menu {
  id: number;
  name: string;
  location: string;
  url: string;
  page_id: number;
  parent: number | null;
  collapse: number;
  sort: number;
}

interface FormValues {
  name: string;
  location: string;
  url: string;
  page_id: number;
  parent: number | null;
  collapse: number;
  sort: number;
}

export default function AddMenuModal({ isOpen, onClose, onAdd }: Props) {
  const t = useTranslations('menus');
  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { name: '', location: '', url: '', page_id: 0, parent: null, collapse: 0, sort: 1 }
  });

  const [parentOptions, setParentOptions] = useState<Menu[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    // Fetch parent menus for select box
    const fetchParents = async () => {
      try {
        const res = await apiServiceCall({ url: 'menus', method: 'GET' });
        if (res?.data?.status) {
          setParentOptions(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchParents();
  }, [isOpen]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        name: data.name,
        location: data.location,
        url: data.url,
        page_id: data.page_id,
        parent: data.parent,
        collapse: data.collapse,
        sort: data.sort
      };

      const res = await apiServiceCall({ url: 'menus', method: 'POST', body: payload });

      if (res?.data) {
        onAdd(res.data); // تحديث الجدول مباشرة
        toast.success(res.message || t('messages.added'));
        reset();
        setTimeout(() => onClose(), 800);
      }
    } catch (err) {
      console.error(err);
      toast.error(t('messages.fetchError'));
    }
  };

  if (!isOpen) return null;

  const parentOptionss = [
  { id: 1, name: 'بدون قائمة رئيسية' },
  { id: 2, name: 'القائمة الرئيسية' },
  { id: 3, name: 'قائمة المستخدم' },
  { id: 4, name: 'قائمة الإعدادات' },
];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">{t('add')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input type="text" placeholder={t('name')} {...register('name', { required: true })} className="w-full p-2 border rounded"/>
          <input type="text" placeholder={t('location')} {...register('location', { required: true })} className="w-full p-2 border rounded"/>
          <input type="text" placeholder={t('url')} {...register('url', { required: true })} className="w-full p-2 border rounded"/>
          <input type="number" placeholder={t('page_id')} {...register('page_id', { required: true })} className="w-full p-2 border rounded"/>
          <Controller
            name="parent"
            control={control}
            render={({ field }) => (
              <CustomSelect
                control={control}
                name="parent"
                placeholder={t('parent')}
                options={parentOptionss.map(p => ({ value: p.id, label: p.name }))}
              />
            )}
          />
          <input type="number" placeholder={t('collapse')} {...register('collapse')} className="w-full p-2 border rounded"/>
          <input type="number" placeholder={t('sort')} {...register('sort', { required: true })} className="w-full p-2 border rounded"/>

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={() => { reset(); onClose(); }} className="px-4 py-2 bg-gray-300 rounded">{t('cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
