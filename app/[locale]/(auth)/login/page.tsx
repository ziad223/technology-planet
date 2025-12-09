'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '../../../../navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const locale = useLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'admin@admin.com' && password === '123456') {
      document.cookie = "loggedIn=true; path=/";
      toast.success(t('success'));
      setTimeout(() => {
        window.location.href = `/${locale}`;
      }, 1500);
    } else {
      toast.error(t('invalid'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="bg-[#1e293b] border border-[#334155] rounded-2xl shadow-2xl p-10 w-full max-w-md">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
          {t('title')}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#334155] text-white placeholder-gray-400 p-3 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />

          <input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#334155] text-white placeholder-gray-400 p-3 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />

          <div className="flex items-center justify-between text-white text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              {t('remember')}
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
            hover:bg-blue-700 hover:shadow-lg transition"
          >
            {t('submit')}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-400">
          {t('noAccount')}{' '}
          <Link href="/register" className="text-blue-400 font-medium hover:underline">
            {t('register')}
          </Link>
        </p>
      </div>
    </div>
  );
}
