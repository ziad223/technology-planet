import React from "react";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center md:gap-7 gap-3">
      <div className="lg:w-[98px] w-[40px] h-[2px] bg-[#D9A45A]"></div>
      <h2 className="lg:text-[22px] text-lg font-bold text-center md:text-start">{title}</h2>
      <div className="lg:w-[98px] w-[40px] h-[2px] bg-[#D9A45A]"></div>
    </div>
  );
};

export default SectionTitle;
