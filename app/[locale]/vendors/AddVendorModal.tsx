'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslations } from 'next-intl';
import apiServiceCall from '@/lib/apiServiceCall';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vendor: any) => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  city_id: string;
  role_id: string;
  password: string;
  active: boolean;
  image: File | null;
}

export default function AddVendorModal({ isOpen, onClose, onAdd }: Props) {
  const t = useTranslations('vendors');
  const { register, handleSubmit, setValue, watch , reset, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city_id: '',
      role_id: '',
      password: '',
      active: true,
      image: null
    }
  });

  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);

  // static roles
  const roles = [
    { value: '1', label: 'مدير' },
    { value: '2', label: 'مطور برمجيات' },
    { value: '3', label: 'محاسب' },
  ];

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await apiServiceCall({ url: 'cities', method: 'GET' });
        setCities(res.data.map((city: any) => ({ id: String(city.id), name: city.name })));
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('city_id', data.city_id);
      formData.append('role_id', data.role_id);
      formData.append('password', data.password);
      formData.append('active', data.active ? '1' : '0');
      if (data.image) formData.append('image', data.image);

      const res = await apiServiceCall(
        { 
            url: 'vendors',
             method: 'POST',
              body: formData,
              headers : {
              'Content-Type': 'multipart/form-data'
              }
             }
    );

      toast.success(res.message || t('vendorCreated'));
      onAdd(res.data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating vendor:', error);
      toast.error(t('failedToCreateVendor'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{t('addVendor')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input type="text" placeholder={t('name')} {...register('name', { required: t('required') })} className="p-2 border rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input type="email" placeholder={t('email')} {...register('email', { required: t('required') })} className="p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input type="text" placeholder={t('phone')} {...register('phone', { required: t('required') })} className="p-2 border rounded" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

          <CustomSelect
            control={control}
            name="city_id"
            label={t('city')}
            placeholder={t('selectCity')}
            options={cities.map(c => ({ value: c.id, label: c.name }))}
            error={errors.city_id?.message}
          />

          <CustomSelect
            control={control}
            name="role_id"
            label={t('role')}
            placeholder={t('selectRole')}
            options={roles}
            error={errors.role_id?.message}
          />

          <input type="password" placeholder={t('password')} {...register('password', { required: t('required') })} className="p-2 border rounded" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('active')} />
            {t('active')}
          </label>

<div className="flex flex-col gap-1">
  <label className="font-medium">{t('image')}</label>
  <div
    className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer relative overflow-hidden"
    onClick={() => document.getElementById('imageInput')?.click()}
  >
    {watch('image') ? (
      <img
        src={URL.createObjectURL(watch('image')!)}
        alt="Preview"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="flex flex-col items-center justify-center text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0-6l-3 3m3-3l3 3m0-12v6m0-6l-3 3m3-3l3 3" />
        </svg>
        <span>{t('uploadImage')}</span>
      </div>
    )}
    <input
      id="imageInput"
      type="file"
      accept="image/*"
      className="absolute inset-0 opacity-0 cursor-pointer"
      onChange={(e) => setValue('image', e.target.files?.[0] || null)}
    />
  </div>
  {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
</div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={() => { reset(); onClose(); }} className="px-4 py-2 bg-gray-300 rounded">{t('cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
