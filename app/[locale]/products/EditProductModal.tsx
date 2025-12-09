'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FiUpload } from 'react-icons/fi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onEdit: (updatedProduct: any) => void;
}

export default function EditProductModal({ isOpen, onClose, product, onEdit }: Props) {
  const t = useTranslations('ProductsPage');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setPreview(product.image || null);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const imageUrl = preview || ''; // استبدل برفع الصورة لل API لو عندك
    onEdit({ ...product, name, price, stock, image: imageUrl });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t('edit')}</h2>
        <input type="text" placeholder={t('name')} value={name} onChange={e => setName(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
        <input type="number" placeholder={t('price')} value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
        <input type="number" placeholder={t('stock')} value={stock} onChange={e => setStock(e.target.value)} className="w-full p-2 mb-4 border rounded"/>

        {/* Upload Box */}
        <div
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer mb-4 relative"
          onClick={() => document.getElementById('editImageInput')?.click()}
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-contain p-2"/>
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <FiUpload size={30} />
              <span className="mt-2">{t('upload')}</span>
            </div>
          )}
          <input
            id="editImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">{t('cancel')}</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">{t('save')}</button>
        </div>
      </div>
    </div>
  );
}
