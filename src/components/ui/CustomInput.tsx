import React from "react";
import { UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  icon?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  icon,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-white mb-2 text-sm">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full bg-white bg-opacity-10 rounded-lg px-2 py-3 text-white text-right placeholder-white ${
            error ? "border border-red-500" : ""
          }`}
          {...register(name)}
        />
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1 text-right">{error}</p>}
    </div>
  );
};

export default CustomInput;
