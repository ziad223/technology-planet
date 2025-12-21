'use client';
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import apiServiceCall from '@/lib/apiServiceCall';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onEdit: (updatedUser: any) => void;
}

export default function EditUserModal({ isOpen, onClose, user, onEdit }: Props) {
  const t = useTranslations('UsersPage');

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city_id: '',
      password: '',
      active: true,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        city_id: String(user.city_id),
        password: '',
        active: user.active,
      });
    }
  }, [user, reset]);


  // 🟢 بيانات المدن (مؤقتة)
  const cityOptions = [
    { value: '1', label: 'الرياض' },
    { value: '2', label: 'جدة' },
    { value: '3', label: 'الدمام' },
  ];

  // ✅ mutation
  const editClientMutation = useMutation({
    mutationFn: (payload: any) =>
      apiServiceCall({
        url: `clients/${user.id}`,
        method: 'PUT',
        body: payload,
      }),

    onSuccess: (res) => {
      if (res?.data) {
        onEdit(res.data);
        toast.success(res.message || t('successEdit'));
       setTimeout(() =>{
         onClose();
       } , 800)
      }
    },

    onError: (error: any) => {
      toast.error(error?.message || t('error'));
    },
  });

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      city_id: Number(data.city_id),
      password: data.password || undefined, // لو فاضي مش هيتغير
      active: data.active,
    };

    editClientMutation.mutate(payload);
  };

    if (!isOpen || !user) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <ToastContainer/>
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-3">
        <h2 className="text-xl font-bold">{t('edit')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* الاسم */}
          <input
            {...register('name', { required: true })}
            placeholder={t('name')}
            className="w-full p-2 border rounded outline-none"
          />

          {/* الإيميل */}
          <input
            {...register('email', { required: true })}
            placeholder={t('email')}
            type="email"
            className="w-full p-2 border rounded outline-none"
          />

          {/* الهاتف */}
          <input
            {...register('phone', { required: true })}
            placeholder={t('phone')}
            className="w-full p-2 border rounded outline-none"
          />

          {/* المدينة */}
          <CustomSelect
            control={control}
            name="city_id"
            placeholder={t('city')}
            options={cityOptions}
            error={errors.city_id?.message as string}
          />

          {/* كلمة المرور */}
          <input
            {...register('password')}
            placeholder={t('password')}
            type="password"
            className="w-full p-2 border rounded outline-none"
          />

          {/* الحالة */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('active')}
              className="w-5 h-5"
            />
            <span>{t('active')}</span>
          </label>

          {/* أزرار */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              {t('cancel')}
            </button>

            <button
              type="submit"
              disabled={editClientMutation.isPending}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            >
              {editClientMutation.isPending ? t('saving') : t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
