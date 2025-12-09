'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Banner } from './BannersClient';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (banner: Banner) => void;
}

export default function AddBannerModal({ open, onClose, onAdd }: Props) {
  const t = useTranslations('BannersPage.add');
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [link, setLink] = useState('');
  const [active, setActive] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) return;

    onAdd({
      id: Date.now().toString(),
      title,
      image: imagePreview,
      link,
      active,
    });

    setTitle('');
    setImageFile(null);
    setImagePreview(null);
    setLink('');
    setActive(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">{t('title')}</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t('title')}
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <div
            className="border border-gray-300 rounded h-40 flex items-center justify-center cursor-pointer overflow-hidden relative"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <FaUpload size={30} />
                <span className="mt-2">{t('uploadImage')}</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
            />
          </div>

          <input
            type="text"
            placeholder={t('link')}
            value={link}
            onChange={e => setLink(e.target.value)}
            className="border p-2 rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={active}
              onChange={e => setActive(e.target.checked)}
            />
            {t('active')}
          </label>

          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              {t('cancel')}
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              {t('save')}
            </button>
          </div>
        </form>

        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500">
          <FaTimes />
        </button>
      </div>
    </div>
  );
}
