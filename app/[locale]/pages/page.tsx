"use client";

import React, { useState, useEffect } from "react";
import { Edit, Trash2, FileText, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import DataTable from "@/components/shared/reusableComponents/Table";
import AddPageModal from "./AddPageModal";
import EditPageModal from "./EditPageModal";
import DeletePageModal from "./DeletePageModal";
import apiServiceCall from "@/lib/apiServiceCall";

export default function PagesPage() {
  const t = useTranslations("pages");

  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<any>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Fetch pages from API
  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const data = await apiServiceCall({ url: "pages", method: "GET" });
        const mappedPages = data.data.map((p: any) => ({
          id: p.id,
          title: p.name,
          content: p.content || 0, // لو الـ API مش بيرجع views
          created_at: p.created_at,
          updated_at: p.updated_at,
        }));
        setPages(mappedPages);
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const columns = [
    { key: "title", header: t("pageName"), align: "right" },
    { key: "content", header: t("content"), align: "center" },
  ];

  const handleAdd = (page: any) =>
    setPages((prev) => [...prev, { ...page, id: Date.now() }]);
  const handleEdit = (page: any) =>
    setPages((prev) => prev.map((p) => (p.id === page.id ? page : p)));
  const handleDelete = (page: any) =>
    setPages((prev) => prev.filter((p) => p.id !== page.id));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <FileText size={22} /> {t("title")}
        </h1>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-blue-600 flex items-center gap-1 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} /> {t("addPage")}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={pages}
        loading={loading}
        emptyMessage={t("empty")}
        actions={(row) => (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setSelected(row);
                setOpenEdit(true);
              }}
              className="text-green-600"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => {
                setSelected(row);
                setOpenDelete(true);
              }}
              className="text-red-600 hover:underline"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      />

      <AddPageModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        setPages={handleAdd}
      />
      {selected && (
        <EditPageModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          page={selected}
          setPages={handleEdit}
        />
      )}
      {selected && (
        <DeletePageModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          page={selected}
          setPages={() => handleDelete(selected)}
        />
      )}
    </div>
  );
}
