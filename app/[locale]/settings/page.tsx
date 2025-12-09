
import React from 'react';
import { getTranslations } from 'next-intl/server';
import SettingsForm from './SettingsForm';

 export default async  function SettingsPage() {
  const t = await getTranslations('settingsPage');

  return (
    <div className=" space-y-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <SettingsForm />
    </div>
  );
}
