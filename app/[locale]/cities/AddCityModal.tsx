'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import apiServiceCall from '@/lib/apiServiceCall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (city: any) => void; // إعادة البيانات للـ parent
}

interface FormValues {
  name: string;
}

export default function AddCityModal({ isOpen, onClose, onSave }: Props) {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { name: '' }
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newCity: FormValues) =>
      apiServiceCall({
        url: 'cities',
        method: 'POST',
        body: newCity
      }),
    onSuccess: (res: any) => {
      toast.success(res.message);       // رسالة النجاح من الـ API
      onSave(res.data);                 // تحديث الجدول في الـ parent
      queryClient.invalidateQueries({ queryKey: ['cities'] }); // تحديث أي استعلام للمدن
      reset();
     setTimeout(() =>{
       onClose();
     } , 800)
    },
    onError: (err: any) => {
      console.error(err);
      toast.error('حدث خطأ أثناء إضافة المدينة');
    }
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">إضافة مدينة</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="اسم المدينة"
            {...register('name', { required: 'الاسم مطلوب' })}
            className="w-full p-2 border rounded outline-none"
          />

          <div className="flex justify-end gap-2 mt-2">
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
              {mutation.isPending ? 'جاري الحفظ...' : 'حفظ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
