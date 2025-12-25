"use client";

import React, { useEffect, useState } from "react";
import { Edit, Trash2, Plus, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

import DataTable from "@/components/shared/reusableComponents/Table";
import AddRoleModal from "./AddRoleModal";
import EditRoleModal from "./EditRoleModal";
import DeleteRoleModal from "./DeleteRoleModal";
import apiServiceCall from "@/lib/apiServiceCall";

export default function RolesPage() {
  const t = useTranslations("roles");

  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<any>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const res = await apiServiceCall({
          url: "roles",
          method: "GET",
        });

        const mappedRoles = res.data.map((role: any) => ({
          id: role.id,
          name: role.name,
        }));

        setRoles(mappedRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const columns = [
    { key: "name", header: t("roleName"), align: "center" },
  ];

  const handleAdd = (role: any) =>
    setRoles((prev) => [...prev, { ...role, id: Date.now() }]);

  const handleEdit = (role: any) =>
    setRoles((prev) => prev.map((r) => (r.id === role.id ? role : r)));

  const handleDelete = (role: any) =>
    setRoles((prev) => prev.filter((r) => r.id !== role.id));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Shield size={22} />
          {t("title")}
        </h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-blue-600 flex items-center gap-1 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          {t("addRole")}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={roles}
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
              className="text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      />

      <AddRoleModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        setRoles={handleAdd}
      />

      {/* {selected && (
        <EditRoleModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          role={selected}
          setRoles={handleEdit}
        />
      )}

      {selected && (
        <DeleteRoleModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          role={selected}
          setRoles={() => handleDelete(selected)}
        />
      )} */}
    </div>
  );
}
