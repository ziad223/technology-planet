"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import apiServiceCall from "@/lib/apiServiceCall";
import { toast, ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface SettingsData {
  website_name: string;
  website_url: string;
  tax_number: string;
  address: string;
  building_number: string;
  street_number: string;
  phone: string;
  is_tax: string;
  website_status: string;
  maintainance_message: string;
  whatsapp: string;
  snapchat: string;
  twitter: string;
  facebook: string;
  instagram: string;
  usage_policy: string;
  logo?: string;
  fav?: string;
}

export default function PolicyEditor() {
  const [content, setContent] = useState("");
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const t = useTranslations('policyPage')

  // 1️⃣ جلب جميع الإعدادات
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await apiServiceCall({
          url: "settings",
          method: "GET",
        });
        
        if (res?.data) {
          setSettings(res.data);
          setContent(res.data.usage_policy || "");
        }
      } catch (error) {
        console.error("Error fetching settings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 2️⃣ حفظ التعديل - إرسال جميع البيانات
  const handleSave = async () => {
    if (!settings) {
      alert("الرجاء الانتظار حتى يتم تحميل الإعدادات");
      return;
    }

    try {
      setIsSaving(true);
      
      // إنشاء FormData لإرسال جميع الحقول
      const formData = new FormData();
      
      // إضافة جميع الحقول من الإعدادات مع تحديث حقل usage_policy
      Object.entries(settings).forEach(([key, value]) => {
        if (key === 'usage_policy') {
          formData.append(key, content);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // التأكد من إضافة الحقول الإلزامية
      const requiredFields = [
        'website_name',
        'website_url', 
        'tax_number',
        'phone',
        'is_tax',
        'website_status'
      ];
      
      requiredFields.forEach(field => {
        if (!formData.has(field) && settings[field as keyof SettingsData]) {
          formData.append(field, settings[field as keyof SettingsData]?.toString() || '');
        }
      });

      await apiServiceCall({
        url: "settings",
        method: "POST",
        body: formData,
      });
      toast.success("تم حفظ التعديلات بنجاح");
    } catch (error) {
      console.error("Error updating policy", error);
      toast.success("فشل حفظ التعديلات. تأكد من تعبئة جميع الحقول الإلزامية");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && !settings) {
    return <div className="p-8 text-center">جاري تحميل البيانات...</div>;
  }

  return (
    <div className="p-5 bg-white rounded-md space-y-4">
      <ToastContainer/>
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        style={{ height: "300px" }}
      />

      <div className="pt-12 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
  {isSaving ? t("saving") : t("save")}
        </button>
      </div>
    </div>
  );
}