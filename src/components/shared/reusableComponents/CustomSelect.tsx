"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

type SelectTypes = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectTypes[];
  error?: string;
  defaultValue?: string; // قيمة افتراضية للحقل
};

export default function CustomSelect({
  control,
  name,
  label,
  placeholder,
  options,
  error,
  defaultValue = "", // افتراضي فارغ
}: CustomSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} // هنا يتم تمرير القيمة الافتراضية
      render={({ field }) => (
        <div className="w-full">
          {label && (
            <label className="mb-2 block text-sm font-medium">{label}</label>
          )}
          <Select
            onValueChange={field.onChange}
            value={field.value || defaultValue} // هنا نعرض القيمة الافتراضية لو موجودة
          >
            <SelectTrigger
              className={`block w-full bg-transparent border ${
                error ? "border-red-500" : "border-gray-300"
              } h-[45px] rounded-[10px] flex items-center px-5`}
            >
              <SelectValue placeholder={placeholder || "اختر..."} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}
    />
  );
}
