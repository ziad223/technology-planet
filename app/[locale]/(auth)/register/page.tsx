'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '../../../../navigation';

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    const locale = useLocale();
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="bg-[#1e293b] border border-[#334155] rounded-2xl shadow-xl p-10 w-full max-w-md">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
          {t('title')}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder={t('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#334155] text-white placeholder-gray-400
            p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />

          <input
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#334155] text-white placeholder-gray-400 
            p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />

          <input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#334155] text-white placeholder-gray-400 
            p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />

          <input
            type="password"
            placeholder={t('confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#334155] text-white placeholder-gray-400 
            p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
            hover:bg-blue-700 hover:shadow-lg transition"
          >
            {t('submit')}
          </button>

        </form>

        <p className="mt-5 text-center text-gray-400">
          {t('haveAccount')}{' '}
          <Link href="/login" className="text-blue-400 font-medium hover:underline">
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
