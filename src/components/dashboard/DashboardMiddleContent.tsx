'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  Users,
  Briefcase,
  FileText,
  Users2,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardMiddleContent: React.FC = () => {
  const t = useTranslations('Dashboard');

  // بيانات الرسم البياني
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: t('clients'),
        data: [5, 10, 7, 12, 8, 15],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
      },
      {
        label: t('serviceProviders'),
        data: [3, 6, 5, 8, 4, 9],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('clientsAndProviders'),
      },
    },
  };

  const cards = [
    {
      title: t('articles'),
      count: 0,
      description: t('viewAllArticles'),
      bgColor: '#fdf4e7',
      icon: <FileText size={32} className="text-yellow-500" />,
    },
    {
      title: t('groups'),
      count: 3,
      description: t('viewAllGroups'),
      bgColor: '#dff0fa',
      icon: <Users2 size={32} className="text-blue-500" />,
    },
    {
      title: t('technicalSupport'),
      count: 0,
      description: t('viewSupportMessages'),
      bgColor: '#f3e7fd',
      icon: <MessageCircle size={32} className="text-purple-500" />,
    },
    {
      title: t('contactUs'),
      count: 0,
      description: t('viewCommunicationMessages'),
      bgColor: '#daf4f0',
      icon: <Phone size={32} className="text-green-500" />,
    },
  ];

  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* المكون الأول: Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">{t('clientsAndProviders')}</h3>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* المكون الثاني: الكاردات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </div>
  );
};

export default DashboardMiddleContent;
