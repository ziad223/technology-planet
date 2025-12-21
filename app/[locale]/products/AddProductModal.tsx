'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FiUpload } from 'react-icons/fi';
import apiServiceCall from '@/lib/apiServiceCall';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

interface Category {
  id: number;
  name: string;
}

interface FormValues {
  name: string;
  category_id: string;
  description: string;
  image: File | null;
}

export default function AddProductModal({ isOpen, onClose, onAdd }: Props) {
  const t = useTranslations('ProductsPage');
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, handleSubmit, control, reset, watch, setValue } = useForm<FormValues>({
    defaultValues: { name: '', category_id: '', description: '', image: null }
  });

  const imageFile = watch('image');

  useEffect(() => {
    if (!isOpen) return;
    const fetchCategories = async () => {
      try {
        const res = await apiServiceCall({ url: 'categories', method: 'GET' });
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // لو عندك API يرفع الصور، هنا استبدل preview بالـ URL الناتج بعد رفع الصورة
      const payload = {
        name: data.name,
        category_id: data.category_id,
        description: data.description,
        image: preview || ''
      };
      const res = await apiServiceCall({ url: 'products', method: 'POST', body: payload });
      onAdd(res.data); // تحديث الجدول مباشرة
      reset(); setPreview(null);
      toast.success(res.message)
      setTimeout(() =>{
        onClose();
      } , 800)
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <ToastContainer/>
      <div className="bg-white p-6 rounded-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">{t('add')}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input type="text" placeholder={t('name')} {...register('name', { required: true })} className="w-full p-2 border rounded"/>
          
          <Controller
            name="category_id"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <CustomSelect
                control={control}
                name="category_id"
                placeholder={t('category')}
                options={categories.map(cat => ({ value: String(cat.id), label: cat.name }))}
                error={fieldState.error?.message}
              />
            )}
          />

          <textarea placeholder="Description" {...register('description')} className="w-full p-2 border rounded"/>

          {/* Upload Box */}
          <div
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer relative"
            onClick={() => document.getElementById('imageInput')?.click()}
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-contain p-2"/>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <FiUpload size={30} />
                <span className="mt-2">{t('upload')}</span>
              </div>
            )}
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={() => { reset(); setPreview(null); onClose(); }} className="px-4 py-2 bg-gray-300 rounded">{t('cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
