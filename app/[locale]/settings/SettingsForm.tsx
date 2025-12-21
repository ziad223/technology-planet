'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import CustomSelect from '@/components/shared/reusableComponents/CustomSelect';
import apiServiceCall from '@/lib/apiServiceCall';
import { toast, ToastContainer } from 'react-toastify';

interface SettingsFormValues {
  website_name: string;
  website_url: string;
  tax_number: string;
  address: string;
  building_number: string;
  street_number: string;
  phone: string;
  is_tax: string;
  website_status: string;
  maintainance_message: string;
  whatsapp: string;
  snapchat: string;
  twitter: string;
  facebook: string;
  instagram: string;
  logo: FileList | string;
  fav: FileList | string;
}

interface ApiSettingsData {
  website_name: string;
  website_url: string;
  tax_number: string;
  address: string;
  building_number: string;
  street_number: string;
  phone: string;
  is_tax: string;
  website_status: string;
  maintainance_message: string;
  whatsapp: string;
  snapchat: string;
  twitter: string;
  facebook: string;
  instagram: string;
  logo: string;
  fav: string;
}

export default function SettingsForm() {
  const t = useTranslations('settingsPage');
  
  const { register, handleSubmit, control, setValue } = useForm<SettingsFormValues>();
  
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [iconPreview, setIconPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  // جلب البيانات
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await apiServiceCall({ method: 'GET', url: 'settings' });
      
      if (response?.data) {
        const data = response.data;
        
        // تعيين كل الحقول
        setValue('website_name', data.website_name || '');
        setValue('website_url', data.website_url || '');
        setValue('tax_number', data.tax_number || '');
        setValue('address', data.address || '');
        setValue('building_number', data.building_number || '');
        setValue('street_number', data.street_number || '');
        setValue('phone', data.phone || '');
        setValue('is_tax', data.is_tax === '1' ? 'active' : 'inactive');
        setValue('website_status', data.website_status === '1' ? 'active' : 'inactive');
        setValue('maintainance_message', data.maintainance_message || '');
        setValue('whatsapp', data.whatsapp || '');
        setValue('snapchat', data.snapchat || '');
        setValue('twitter', data.twitter || '');
        setValue('facebook', data.facebook || '');
        setValue('instagram', data.instagram || '');
        
        // الصور
        if (data.logo) {
          const fullLogoUrl = `http://localhost:8000/${data.logo}`;
          setLogoPreview(fullLogoUrl);
          setValue('logo', data.logo);
        }
        
        if (data.fav) {
          const fullIconUrl = `http://localhost:8000/${data.fav}`;
          setIconPreview(fullIconUrl);
          setValue('fav', data.fav);
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.success('فشل تحميل الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoClick = () => logoInputRef.current?.click();
  const handleIconClick = () => iconInputRef.current?.click();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setLogoPreview(URL.createObjectURL(file));
      setValue('logo', e.target.files);
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setIconPreview(URL.createObjectURL(file));
      setValue('fav', e.target.files);
    }
  };

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setIsLoading(true);
      
      const formData = new FormData();
      
      // النصوص
      formData.append('website_name', data.website_name);
      formData.append('website_url', data.website_url);
      formData.append('tax_number', data.tax_number);
      formData.append('address', data.address || '');
      formData.append('building_number', data.building_number);
      formData.append('street_number', data.street_number);
      formData.append('phone', data.phone);
      formData.append('is_tax', data.is_tax === 'active' ? '1' : '0');
      formData.append('website_status', data.website_status === 'active' ? '1' : '0');
      formData.append('maintainance_message', data.maintainance_message || '');
      formData.append('whatsapp', data.whatsapp || '');
      formData.append('snapchat', data.snapchat || '');
      formData.append('twitter', data.twitter || '');
      formData.append('facebook', data.facebook || '');
      formData.append('instagram', data.instagram || '');
      
      // الصور
      if (data.logo instanceof FileList && data.logo[0]) {
        formData.append('logo', data.logo[0]);
      } else if (typeof data.logo === 'string') {
        formData.append('logo', data.logo);
      }
      
      if (data.fav instanceof FileList && data.fav[0]) {
        formData.append('fav', data.fav[0]);
      } else if (typeof data.fav === 'string') {
        formData.append('fav', data.fav);
      }

      await apiServiceCall({
        method: 'POST',
        url: 'settings',
        body: formData,
      });

      toast.success('تم تحديث الإعدادات بنجاح');
      await fetchSettings();
      
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.success('فشل حفظ الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = [
    { value: 'active', label: t('active') },
    { value: 'inactive', label: t('inactive') },
  ];

  if (isLoading && !logoPreview) {
    return <div className="p-8 text-center">جاري التحميل...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-xl space-y-6">
      <ToastContainer/>
      <h2 className="text-2xl font-bold">{t('basicData')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium">{t('nameSite')}</label>
          <input {...register('website_name')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">{t('urlSite')}</label>
          <input {...register('website_url')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">{t('taxNumber')}</label>
          <input {...register('tax_number')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        
        
        
        <div>
          <label className="block mb-2 font-medium">{t('buildingNumber')}</label>
          <input {...register('building_number')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">{t('street')}</label>
          <input {...register('street_number')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">{t('phone')}</label>
          <input {...register('phone')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        <div className='md:col-span-2'>
          <label className="block mb-2 font-medium">{t('address')}</label>
          <input {...register('address')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" placeholder="العنوان الكامل" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CustomSelect control={control} name="is_tax" label={t('activateTax')} options={statusOptions} />
        <CustomSelect control={control} name="website_status" label={t('siteStatus')} options={statusOptions} />
      </div>
      
      <div>
        <label className="block mb-2 font-medium">{t('siteDeactivationMsg')}</label>
        <textarea {...register('maintainance_message')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" rows={3} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium">{t('whatsapp')}</label>
          <input {...register('whatsapp')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">{t('snapchat')}</label>
          <input {...register('snapchat')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">{t('twitter')}</label>
          <input {...register('twitter')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">{t('facebook')}</label>
          <input {...register('facebook')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">{t('instagram')}</label>
          <input {...register('instagram')} className="w-full border rounded px-3 py-2 placeholder:text-sm text-sm outline-none" />
        </div>
      </div>
      
      {/* الصور */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-medium">{t('logoImage')}</label>
          <div onClick={handleLogoClick} className="h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer">
            {logoPreview ? (
              <>
                <img src={logoPreview} alt="Logo" className="max-h-24 object-contain mb-2" />
                <span className="text-sm text-gray-500">انقر لتغيير اللوجو</span>
              </>
            ) : (
              <>
                <div className="text-4xl text-gray-400 mb-2">+</div>
                <span className="text-gray-500">{t('clickToUploadLogo')}</span>
              </>
            )}
          </div>
          <input type="file" {...register('logo')} className="hidden" ref={logoInputRef} onChange={handleLogoChange} />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">{t('browserIcon')}</label>
          <div onClick={handleIconClick} className="h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer">
            {iconPreview ? (
              <>
                <img src={iconPreview} alt="Icon" className="max-h-24 object-contain mb-2" />
                <span className="text-sm text-gray-500">انقر لتغيير الأيقونة</span>
              </>
            ) : (
              <>
                <div className="text-4xl text-gray-400 mb-2">+</div>
                <span className="text-gray-500">{t('clickToUploadIcon')}</span>
              </>
            )}
          </div>
          <input type="file" {...register('fav')} className="hidden" ref={iconInputRef} onChange={handleIconChange} />
        </div>
      </div>
      
      <div className="flex justify-end pt-6 border-t">
        <button type="submit" disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {isLoading ? 'جاري الحفظ...' : t('save')}
        </button>
      </div>
    </form>
  );
}