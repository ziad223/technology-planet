'use client';

import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';

interface SettingsFormValues {
  nameSite: string;
  adminAge: string;
  urlSite: string;
  taxNumber: string;
  buildingNumber: string;
  street: string;
  phone: string;
  email: string;
  activateTax: string;
  whatsapp: string;
  snapchat: string;
  twitter: string;
  facebook: string;
  instagram: string;
  siteStatus: string;
  siteDeactivationMsg: string;
  logoImage: FileList;
  browserIcon: FileList;
}

export default function SettingsForm() {
  const t = useTranslations('settingsPage');
  const { register, handleSubmit, control } = useForm<SettingsFormValues>({
    defaultValues: { activateTax: 'active', siteStatus: 'active' },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogoClick = () => logoInputRef.current?.click();
  const handleIconClick = () => iconInputRef.current?.click();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIconPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit: SubmitHandler<SettingsFormValues> = (data) => {
    console.log(data);
    alert('Form submitted');
  };

  const statusOptions = [
    { value: 'active', label: t('active') },
    { value: 'inactive', label: t('inactive') },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto p-4 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-xl font-bold">{t('basicData')}</h2>

      {/* Name, Admin, URL, Tax */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div>
          <label className="block mb-2 font-medium">{t('nameSite')}</label>
          <input {...register('nameSite')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('adminAge')}</label>
          <input {...register('adminAge')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('urlSite')}</label>
          <input {...register('urlSite')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('taxNumber')}</label>
          <input {...register('taxNumber')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div>
          <label className="block mb-2 font-medium">{t('buildingNumber')}</label>
          <input {...register('buildingNumber')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('street')}</label>
          <input {...register('street')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('phone')}</label>
          <input {...register('phone')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('email')}</label>
          <input {...register('email')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
        <CustomSelect control={control} name="activateTax" label={t('activateTax')} options={statusOptions} />
        <CustomSelect control={control} name="siteStatus" label={t('siteStatus')} options={statusOptions} />
      </div>

      {/* Site Deactivation Message */}
      <div>
        <label className="block mb-2 font-medium">{t('siteDeactivationMsg')}</label>
        <textarea {...register('siteDeactivationMsg')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" rows={3} />
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium">{t('whatsapp')}</label>
          <input {...register('whatsapp')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('snapchat')}</label>
          <input {...register('snapchat')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('twitter')}</label>
          <input {...register('twitter')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('facebook')}</label>
          <input {...register('facebook')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('instagram')}</label>
          <input {...register('instagram')} className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      {/* Logo & Browser Icon */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">{t('logoImage')}</label>
          <div
            onClick={handleLogoClick}
            className="w-full h-32 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 overflow-hidden"
          >
            {logoPreview ? (
              <img src={logoPreview} alt="Logo Preview" className="object-contain h-full w-full" />
            ) : (
              <span className="text-gray-400">Click to upload logo</span>
            )}
          </div>
          <input type="file" {...register('logoImage')} className="hidden" ref={logoInputRef} onChange={handleLogoChange} />
        </div>

        <div>
          <label className="block mb-2 font-medium">{t('browserIcon')}</label>
          <div
            onClick={handleIconClick}
            className="w-full h-32 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 overflow-hidden"
          >
            {iconPreview ? (
              <img src={iconPreview} alt="Icon Preview" className="object-contain h-full w-full" />
            ) : (
              <span className="text-gray-400">Click to upload icon</span>
            )}
          </div>
          <input type="file" {...register('browserIcon')} className="hidden" ref={iconInputRef} onChange={handleIconChange} />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          {t('save')}
        </button>
      </div>
    </form>
  );
}
