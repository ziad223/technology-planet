import React, { ReactNode } from "react";
type CustomButtonProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
};
const CustomButton = (props: CustomButtonProps) => {
  return (
    <button
      onClick={() => props.onClick && props.onClick()}
      className={`${props.bgColor || "bg-primary"} w-full ${props.textColor || "text-white"}  text-center px-[50px] py-3 rounded-[10px] ${
        props.className && props.className
      }`}
    >
      {props.children}
    </button>
  );
};

export default CustomButton;
