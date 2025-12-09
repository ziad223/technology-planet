'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Users, Briefcase, Layers, Package } from 'lucide-react';
import DashboardMiddleContent from './DashboardMiddleContent';

const DashboardHomeContent: React.FC = () => {
  const t = useTranslations('Dashboard');

  const cards = [
    {
      title: t('clients'),
      count: 1,
      description: t('viewAllClients'),
      bgColor: '#fdf4e7',
      icon: <Users size={32} className="text-blue-500" />,
    },
    {
      title: t('serviceProviders'),
      count: 0,
      description: t('viewAllProviders'),
      bgColor: '#dff0fa',
      icon: <Briefcase size={32} className="text-green-500" />,
    },
    {
      title: t('sections'),
      count: 2,
      description: t('viewAllSections'),
      bgColor: '#f3e7fd',
      icon: <Layers size={32} className="text-purple-500" />,
    },
    {
      title: t('products'),
      count: 0,
      description: t('viewAllProducts'),
      bgColor: '#daf4f0',
      icon: <Package size={32} className="text-pink-500" />,
    },
  ];

  return (
    <div className="">
      <h2 className="text-2xl font-bold">{t('dashboardHome')}</h2>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow relative"
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-700 text-sm">{card.title}</p>
                <p className="text-3xl font-bold mt-2">{card.count}</p>
              </div>
              <div>{card.icon}</div>
            </div>
            <p className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline">
              {card.description}
            </p>
          </div>
        ))}
      </div>
       <DashboardMiddleContent/>
       <div className='bg-white mt-5 h-[50px] flex items-center justify-center text-sm'>
        جميع الحقوق محفوظة لـ كواكب التقنية . © 2024
       </div>
    </div>
  );
};

export default DashboardHomeContent;
