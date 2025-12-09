import React from "react";
type Props = {
  className?: string;
  children: React.ReactNode;
};
const Container = ({ className, children }: Props) => {
  return (
    <div
      className={`container mx-auto py-10 md:py-[60px] px-4 md:px-5 lg:px-20  ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
