"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth.login");

  const onSubmit = (data) => {
    const { email, password } = data;

    if (email === "admin@admin.com" && password === "123456") {
      // 👉 تخزين الدخول في Cookie
      document.cookie = "loggedIn=true; path=/";

      toast.success(t("success"));

      setTimeout(() => {
        router.push(`/${locale}`);
      }, 1200);
    } else {
      toast.error(t("invalid"));
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 min-h-screen">
      <ToastContainer position="top-right" autoClose={1500} />

      {/* LEFT FORM SIDE */}
      <div className="flex flex-col text-center lg:text-start w-full lg:w-1/2 px-6 lg:px-12 py-10">
        <Image
          width={200}
          height={200}
          src="/images/logo7.png"
          alt="logo"
          className="w-[120px] h-[120px] lg:w-[350px] lg:h-[200px]"
        />

        <h2 className="text-xl lg:text-[24px] font-semibold mt-5">{t("title")}</h2>
        <h3 className="mt-1 text-gray-500 text-sm lg:text-base">
          {t("subtitle")}
        </h3>

        <form className="mt-8 w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>

          {/* EMAIL */}
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-sm lg:text-base text-right">{t("email")}</label>
            <div className="relative w-full">
              <input
                type="email"
                {...register("email", { required: t("emailRequired") })}
                className="h-[50px] rounded-lg border border-gray-300 bg-transparent outline-none px-5 w-full"
                placeholder={t("emailPlaceholder")}
              />
              <Image
                width={35}
                height={35}
                src="/images/login-email.svg"
                alt="email-icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-3 mt-5">
            <label className="font-semibold text-sm lg:text-base text-right">{t("password")}</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: t("passwordRequired") })}
                className="h-[50px] rounded-lg border border-gray-300 bg-transparent outline-none px-5 w-full"
                placeholder={t("passwordPlaceholder")}
              />

              <Image
                width={35}
                height={35}
                src="/images/login-eye.svg"
                alt="eye-icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="mt-6 w-full bg-[#09adce] text-white py-3 rounded-lg font-semibold hover:bg-[#0894ad] transition"
          >
            {t("submit")}
          </button>
        </form>
      </div>

      {/* RIGHT IMAGE SIDE */}
      <div className="relative h-[300px] lg:h-screen w-full lg:w-1/2">
        <Image
          fill
          src="/images/login-bg.jpeg"
          alt="bg"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#09adce]/40"></div>

        <div className="absolute inset-0 text-white p-6 lg:p-20 flex flex-col justify-center items-center lg:items-end text-center lg:text-right">
          <Image
            width={150}
            height={150}
            src="/images/login-logo.jfif"
            alt="loginLogo"
            className="w-[120px] h-[100px] lg:w-[160px] lg:h-[130px]"
          />

          <div className="mt-5">
            <h1 className="text-xl lg:text-[40px] font-bold leading-[35px] lg:leading-[55px]">
              برنامج ادارة وتأجير قاعات الافراح
            </h1>
            <h2 className="text-lg lg:text-[30px] font-semibold leading-[28px] lg:leading-[45px]">
              Wedding hall management and rental program
            </h2>
            <p className="text-base lg:text-xl mt-6 lg:mt-20">شركة كواكب التقنية</p>
          </div>
        </div>
      </div>
    </div>
  );
}
