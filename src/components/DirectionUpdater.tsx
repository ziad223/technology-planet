'use client';

import { useEffect } from 'react';

interface DirectionUpdaterProps {
  currentLocale: string;
}

const DirectionUpdater: React.FC<DirectionUpdaterProps> = ({ currentLocale }) => {
  useEffect(() => {
    const dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', currentLocale);
    document.body.setAttribute('dir', dir);
  }, [currentLocale]);

  return null;
};

export default DirectionUpdater;
