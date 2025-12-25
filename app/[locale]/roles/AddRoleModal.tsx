"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import apiServiceCall from "@/lib/apiServiceCall";

interface Props {
  open: boolean;
  onClose: () => void;
  setRoles: (role: any) => void;
}

interface FormValues {
  name: string;
  permissions: string[]; // مصفوفة واحدة لكل role
}

export default function AddRoleModal({ open, onClose, setRoles }: Props) {
  const t = useTranslations("roles");

  const { register, handleSubmit, setValue, reset, watch } = useForm<FormValues>({
    defaultValues: { name: "", permissions: [""] },
  });

  const permissions = watch("permissions");

  const onSubmit = async (data: FormValues) => {
    try {
      // إزالة العناصر الفارغة وإرسالها كمصفوفة واحدة داخل permissions
      const payload = {
        name: data.name,
        permissions: [data.permissions.filter((a) => a !== "")], // مصفوفة واحدة
      };

      const res = await apiServiceCall({ url: "roles", method: "POST", body: payload });

      setRoles(res.data);
      toast.success(res.message || "Role created!");
      reset();
      setTimeout(() => onClose(), 800);
    } catch (error) {
      console.error("Error creating role:", error);
      toast.error("Failed to create role");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{t("addRole")}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Role Name */}
          <input
            type="text"
            placeholder={t("roleName")}
            {...register("name", { required: true })}
            className="w-full p-2 border rounded"
          />

          {/* Permissions (Actions) */}
          <div>
            <label className="font-semibold mb-2 block">{t("permissions")}</label>
            {permissions.map((action, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  placeholder={t("permissionPlaceholder")}
                  {...register(`permissions.${index}` as const)}
                  className="flex-1 p-2 border rounded"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newActions = [...permissions];
                      newActions.splice(index, 1);
                      setValue("permissions", newActions);
                    }}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setValue("permissions", [...permissions, ""])}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {t("addPermission")}
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => { reset(); onClose(); }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              {t("cancel")}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
