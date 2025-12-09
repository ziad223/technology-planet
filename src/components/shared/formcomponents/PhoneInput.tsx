// @ts-nocheck

"use client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface Iprops {
  label?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const CostumPhoneInput = ({ label, className, value, onChange }: Iprops) => {
  const t = useTranslations("ContactUsSection");
  const [error, setError] = useState("");

  const handleChange = (value) => {
    onChange(value); // Pass the value back to the form

    if (value && !isValidPhoneNumber(value)) {
      setError(t("invalid_phone"));
    } else {
      setError("");
    }
  };

  return (
    <div className={`${className ? className : ""}`}>
      {label && <label>{label}</label>}
      {label && <div className="mb-2" />}

      <PhoneInput
        className="phone-input-wrapper w-full [&>input]:bg-white [&>input]:px-2 [&>input]:py-3 [&>input]:bg-opacity-10 bg-black bg-opacity-10  ltr:[&>input]:rounded-r-lg rtl:[&>input]:rounded-l-lg rounded-lg [&>input]:p-4 [&>input]:md:p-3 ltr:[&_.PhoneInputCountry]:!rounded-l-lg rtl:[&_.PhoneInputCountry]:!rounded-r-lg [&_.PhoneInputCountry]:!mx-0 [&_.PhoneInputCountry]:!px-2  [&_.PhoneInputCountry]:!bg-white [&_.PhoneInputCountry]:!bg-opacity-10  [&_.PhoneInputCountrySelectArrow]:!hidden [&>.PhoneInputCountry]:mx-2 [&_.PhoneInputCountrySelect]:bg-black text-white"
        // className="    text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500
        //           [&_input]:outline-none [&_input]:border-0"
        defaultCountry="AE"
        value={value}
        onChange={handleChange}
        international
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CostumPhoneInput;
