'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Admin } from './AdminsTable';
import { FaTimes } from 'react-icons/fa';

interface Props {
  open: boolean;
  admin: Admin;
  onClose: () => void;
  onSave: (updated: Admin) => void;
}

export default function EditAdminModal({ open, admin, onClose, onSave }: Props) {
  const [name, setName] = useState(admin.name);
  const [email, setEmail] = useState(admin.email);
  const [group, setGroup] = useState(admin.group);

  useEffect(() => {
    setName(admin.name);
    setEmail(admin.email);
    setGroup(admin.group);
  }, [admin]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Edit Admin</h2>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...admin, name, email, group });
          }}
        >
          <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />
          <input value={group} onChange={(e) => setGroup(e.target.value)} className="border p-2 rounded" />
          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
          </div>
        </form>
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500"><FaTimes /></button>
      </div>
    </div>,
    document.body
  );
}
