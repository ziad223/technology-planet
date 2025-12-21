'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@tanstack/react-query';
import apiServiceCall from '@/lib/apiServiceCall';
import { LuUserRound } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import Link from 'next/link';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const locale = useLocale()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => apiServiceCall({
      url: 'login',
      method: 'POST',
      body: data,
    }),
    onSuccess: (data) => {
      // حفظ التوكن في localStorage
    document.cookie = `loggedIn=true; path=/; max-age=${60*60*24}`; // يوم واحد

localStorage.setItem('user', JSON.stringify(data.data));
localStorage.setItem('role', JSON.stringify(data.data.role));
localStorage.setItem('permissions', JSON.stringify(data.permissions));
localStorage.setItem('token', data.token);
  toast.success(t('success'));
      setTimeout(() => {
        window.location.href = `/${locale}`;
      }, 800);
    },
    onError: (error: any) => {
      toast.error(error?.message || t('invalid'));
    }
  });

  const onSubmit = (formData: LoginFormValues) => {
    loginMutation.mutate(formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url(/images/login-bg.jpeg)] bg-no-repeat bg-cover after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:-z-10 after:bg-[rgba(114,114,114,0.2)] after:bg-gradient-to-br after:from-[rgba(3,1,76,0.36)] after:to-[rgba(28,28,28,0.36)]">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="container flex flex-col gap-4 items-center justify-center max-w-screen-xl mx-4 px-4">
        <div className="w-[550px] max-w-full min-h-[500px] bg-[#fff] rounded-[15px] shadow-2xl p-10">
          <h2 className="text-xl font-bold mb-4 text-center text-[#3E3E3E]">
            {t('title')}
          </h2>

          <p className='text-center text-xs font-normal opacity-50 mb-8'>
            {t('Welcome')}
          </p>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="inp-grop flex items-center gap-1 border border-[#03014c33] rounded-md px-[0.5rem]"> 
              <LuUserRound fontSize={23} className='text-gray-500' />
              <input
                type="email"
                placeholder={t('email')}
                {...register('email', { required: true })}
                className="w-full h-full py-[0.9rem] text-slate-950 font-normal placeholder:font-normal placeholder-gray-500 outline-none placeholder:transition-all duration-500 focus:placeholder-transparent"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{t('emailRequired')}</p>}

            <div className="inp-grop flex items-center gap-1 border border-[#03014c33] rounded-md px-[0.5rem]"> 
              <AiOutlineEye fontSize={23} className='text-gray-500' />
              <input
                type="password"
                placeholder={t('password')}
                {...register('password', { required: true })}
                className="w-full h-full py-[0.9rem] text-slate-950 font-normal placeholder:font-normal placeholder-gray-500 outline-none placeholder:transition-all duration-500 focus:placeholder-transparent"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{t('passwordRequired')}</p>}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[#3E3E3E] text-sm">
                <input type="checkbox" className="accent-blue-500" />
                {t('remember')}
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-[65px] bg-[#3E3E3E] text-white text-base rounded-lg font-semibold hover:bg-[#25456d] hover:shadow-lg transition"
              disabled={loginMutation.isLoading}
            >
              {loginMutation.isLoading ? t('loading') : t('submit')}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            {t('noAccount')}{' '}
            <Link href="/register" className="text-[#25456d] font-medium hover:underline">
              {t('register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
