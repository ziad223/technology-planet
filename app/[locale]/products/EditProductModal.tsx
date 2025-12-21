'use client';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';
import apiServiceCall from '@/lib/apiServiceCall';
import { useTranslations } from 'next-intl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onEdit: (updatedProduct: any) => void;
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

export default function EditProductModal({ isOpen, onClose, product, onEdit }: Props) {
  const t = useTranslations('ProductsPage');
  const [categories, setCategories] = useState<Category[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const { control, register, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      name: '',
      category_id: '',
      description: '',
      image: null,
    },
  });

  const imageFile = watch('image');

  // جلب الأقسام عند فتح المودال
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

  // تحميل بيانات المنتج عند تغييره
  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        category_id: String(product.category_id) || '',
        description: product.description || '',
        image: null,
      });
      setPreview(product.image || null);
    }
  }, [product, reset]);

  if (!isOpen || !product) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.name || !data.category_id) {
      toast.error('Name and category are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('category_id', data.category_id);
      formData.append('description', data.description);
      if (data.image) formData.append('image', data.image);

      const res = await apiServiceCall({
        url: `products/${product.id}`,
        method: 'PUT',
        body: formData,
        headers: {}, // axios يحدد Content-Type تلقائي
      });

      onEdit(res.data);
      toast.success(res.message || 'Product updated successfully');
      setTimeout(() =>{
        onClose();
      } , 800)
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error(error?.message || 'Error updating product');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <ToastContainer />
      <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold">{t('edit')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder={t('name')}
            {...register('name', { required: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          <Controller
            control={control}
            name="category_id"
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

          <textarea
            placeholder="Description"
            {...register('description')}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          {/* Upload Box */}
          <div
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer relative"
            onClick={() => document.getElementById('imageInput')?.click()}
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-contain p-2" />
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
            <button
              type="button"
              onClick={() => {
                reset({
                  name: product.name || '',
                  category_id: String(product.category_id) || '',
                  description: product.description || '',
                  image: null,
                });
                setPreview(product.image || null);
                onClose();
              }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              {t('cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
