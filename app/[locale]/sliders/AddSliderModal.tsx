'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slider: any) => void;
}

interface FormValues {
  title: string;
  subtitle: string;
  cover: File | null;
}

export default function AddSliderModal({ isOpen, onClose, onSave }: Props) {
  const t = useTranslations('sliders');
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormValues>({
    defaultValues: { title: '', subtitle: '', cover: null },
  });

  const queryClient = useQueryClient();
  const coverFile = watch('cover');
  const [preview, setPreview] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      // لو عندك API يقبل multipart/form-data
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('subtitle', data.subtitle);
      if (data.cover) formData.append('cover', data.cover);

      return apiServiceCall({
        url: 'sliders',
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (res: any) => {
      toast.success(res.message);
      onSave({
        id: res.data.id.toString(),
        title: res.data.title,
        description: res.data.subtitle,
        image: res.data.cover_url,
      });
      reset();
      setPreview(null);
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
      setTimeout(() =>{
        onClose();
      } , 800)
    },
    onError: (err: any) => {
      console.error(err);
      toast.error('حدث خطأ أثناء إضافة البنر');
    },
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('cover', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{t('add_slider')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Image Upload */}
          <label className="block mb-4">
            <div
              className="border-2 border-dashed rounded-lg h-40 flex justify-center items-center cursor-pointer"
              onClick={() => document.getElementById('coverInput')?.click()}
            >
              {preview ? (
                <img src={preview} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-gray-500 flex flex-col items-center">
                  <Upload size={32} />
                  <span>{t('upload_image')}</span>
                </div>
              )}
              <input
                id="coverInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </div>
          </label>

          {/* Title */}
          <input
            type="text"
            placeholder={t('title_text')}
            {...register('title', { required: 'العنوان مطلوب' })}
            className="border p-2 w-full rounded"
          />

          {/* Subtitle */}
          <input
            type="text"
            placeholder={t('description')}
            {...register('subtitle', { required: 'الوصف مطلوب' })}
            className="border p-2 w-full rounded"
          />

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => { reset(); setPreview(null); onClose(); }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              {t('cancel')}
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {mutation.isPending ? 'جاري الحفظ...' : t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
