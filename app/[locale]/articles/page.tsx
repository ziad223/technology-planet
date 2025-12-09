'use client';
import React, { useState } from 'react';
import DataTable from '@/components/shared/reusableComponents/Table';
import AddArticleModal from './AddArticleModal';
import EditArticleModal from './EditArticleModal';
import DeleteArticleModal from './DeleteArticleModal';
import { useTranslations } from 'next-intl';
import { Edit, Trash2 } from 'lucide-react';

export default function ArticlesPage() {
  const t = useTranslations('ArticlesPage');

  const [articles, setArticles] = useState([
    { id: 1, title: 'React Basics', author: 'Ziad', date: '2025-12-01' },
    { id: 2, title: 'Next.js Tips', author: 'Ahmed', date: '2025-12-02' },
    { id: 3, title: 'Tailwind CSS Guide', author: 'Sara', date: '2025-12-03' },
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const columns = [
    { key: 'id', header: t('id'), align: 'center' },
    { key: 'title', header: t('title'), align: 'left' },
    { key: 'author', header: t('author'), align: 'left' },
    { key: 'date', header: t('date'), align: 'center' },
  ];

  const handleAdd = (article: any) => setArticles(prev => [...prev, article]);
  const handleEdit = (article: any) => setArticles(prev => prev.map(a => a.id === article.id ? article : a));
  const handleDelete = (article: any) => setArticles(prev => prev.filter(a => a.id !== article.id));

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t('titlee')}</h1>
        <button onClick={() => setAddOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">{t('add')}</button>
      </div>

      <DataTable
        columns={columns}
        data={articles}
        actions={(article) => (
          <div className="flex justify-center gap-2">
            <button onClick={() => { setSelectedArticle(article); setEditOpen(true); }} className="p-2 rounded  text-green-600"><Edit/></button>
            <button onClick={() => { setSelectedArticle(article); setDeleteOpen(true); }} className="p-2 rounded  text-red-600"><Trash2/></button>
          </div>
        )}
        emptyMessage={t('noData')}
      />

      {/* المودالات */}
      <AddArticleModal isOpen={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <EditArticleModal isOpen={editOpen} onClose={() => setEditOpen(false)} article={selectedArticle} onEdit={handleEdit} />
      <DeleteArticleModal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} article={selectedArticle} onDelete={handleDelete} />
    </div>
  );
}
