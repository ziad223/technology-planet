'use client';
import React, { useState, useEffect } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import AddArticleModal from './AddArticleModal';
import EditArticleModal from './EditArticleModal';
import DeleteArticleModal from './DeleteArticleModal';
import { useTranslations } from 'next-intl';
import { Edit, Trash2 } from 'lucide-react';
import apiServiceCall from '@/lib/apiServiceCall';
import Image from 'next/image';

// ----- Types -----
interface Article {
  id: number;
  title: string;
  content: string;
  active: boolean;
  image?: string;
  created_at: string;
  author?: string;
}

export default function ArticlesPage() {
  const t = useTranslations('ArticlesPage');

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // 🔹 جلب المقالات من الـ API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await apiServiceCall({ url: 'articles', method: 'GET' });
        if (res?.data) setArticles(res.data);
      } catch (error) {
        console.error('Error fetching articles', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // 🔹 أعمدة الجدول
  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    {
      key: 'image',
      header: t('image'),
      align: 'center',
      render: (article: Article) => {
        return article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            width={70}
            height={50}
            className="object-cover rounded"
          />
        ) : (
          <div className='w-[70px] h-[50px] mx-auto rounded bg-gray-300'></div>
        );
      },
    },
    { key: 'title', header: t('title'), align: 'left' },
    { key: 'created_at', header: t('date'), align: 'center' },
     {
      key: 'active',
      header: t('status'),
      align: 'center',
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {value ? t('active') : t('inactive')}
        </span>
      ),
    },
  ];

  // 🔹 دوال CRUD
  const handleAdd = (article: Article) => setArticles(prev => [article, ...prev]);
  const handleEdit = (article: Article) =>
    setArticles(prev => prev.map(a => (a.id === article.id ? article : a)));
  const handleDelete = (article: Article) =>
    setArticles(prev => prev.filter(a => a.id !== article.id));

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {t('add')}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={articles}
        actions={(article) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                setSelectedArticle(article);
                setEditOpen(true);
              }}
              className="p-2 rounded text-green-600"
            >
              <Edit />
            </button>
            <button
              onClick={() => {
                setSelectedArticle(article);
                setDeleteOpen(true);
              }}
              className="p-2 rounded text-red-600"
            >
              <Trash2 />
            </button>
          </div>
        )}
        emptyMessage={t('noData')}
      />

      {/* مودالات المقال */}
      <AddArticleModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <EditArticleModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        article={selectedArticle}
        onEdit={handleEdit}
      />
      <DeleteArticleModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        article={selectedArticle}
        onDelete={handleDelete}
      />
    </div>
  );
}
