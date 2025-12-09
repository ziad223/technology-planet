"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DataTable from "@/components/shared/reusableComponents/Table";
import AddPageModal from "./AddPageModal";
import EditPageModal from "./EditPageModal";
import DeletePageModal from "./DeletePageModal";
import { Edit, FileText, Trash2 } from "lucide-react";

export default function PagesPage() {
  const t = useTranslations("pages");

  // بيانات ستاتيك
  const [pages, setPages] = useState([
    { id: 1, title: "سياسة الخصوصية", views: 120 },
    { id: 2, title: "الشروط والأحكام", views: 80 },
    { id: 3, title: "من نحن", views: 300 },
  ]);

  const [selected, setSelected] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const columns = [
    {
      key: "title",
      header: t("pageName"),
      align: "right",
    },
    {
      key: "views",
      header: t("views"),
      align: "center",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <FileText size={22} /> {t("title")}
        </h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {t("addPage")}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={pages}
        emptyMessage={t("empty")}
        actions={(row) => (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setSelected(row);
                setOpenEdit(true);
              }}
              className="text-green-600 "
            >
              <Edit/>
            </button>

            <button
              onClick={() => {
                setSelected(row);
                setOpenDelete(true);
              }}
              className="text-red-600 hover:underline"
            >
              <Trash2/>
            </button>
          </div>
        )}
      />

      {/* المودالات */}
      <AddPageModal open={openAdd} onClose={() => setOpenAdd(false)} setPages={setPages} />
      {selected && (
        <EditPageModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          page={selected}
          setPages={setPages}
        />
      )}
      {selected && (
        <DeletePageModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          page={selected}
          setPages={setPages}
        />
      )}
    </div>
  );
}
