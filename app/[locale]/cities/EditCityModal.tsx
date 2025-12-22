'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';

interface Props {
  isOpen: boolean;
  city: any;
  onClose: () => void;
  onSave: (updatedCity: any) => void;
}

interface FormValues {
  name: string;
}

export default function EditCityModal({ isOpen, city, onClose, onSave }: Props) {
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: { name: '' }
  });

  const queryClient = useQueryClient();

  // تحميل البيانات الحالية عند فتح المودال
  useEffect(() => {
    if (city) {
      setValue('name', city.name_ar);
    }
  }, [city, setValue]);

  const mutation = useMutation({
    mutationFn: (updatedCity: FormValues) =>
      apiServiceCall({
        url: `cities/${city.id}`,
        method: 'PUT',
        body: updatedCity
      }),
    onSuccess: (res: any) => {
      toast.success(res.message);
      onSave(res.data); // تحديث الجدول في parent
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      reset();
      setTimeout(() =>{
onClose();
      } , 800)
    },
    onError: (err: any) => {
      console.error(err);
      toast.error('حدث خطأ أثناء تعديل المدينة');
    }
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  if (!isOpen || !city) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">تعديل المدينة</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="mb-4">
            <label>اسم المدينة</label>
            <input
              className="border p-2 w-full rounded"
              {...register('name', { required: 'الاسم مطلوب' })}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => { reset(); onClose(); }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {mutation.isPending ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
