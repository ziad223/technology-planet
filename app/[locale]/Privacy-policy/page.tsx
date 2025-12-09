
import React from 'react';
import PrivacyEditor from './PrivacyEditor';
import { getTranslations } from 'next-intl/server';

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('privacyPage');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold text-start">{t('title')}</h1>

        <PrivacyEditor />
    </div>
  );
}
