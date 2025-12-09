"use client";
import useCurrentLang from "@/hooks/useCurrentLang";
import Link from "next/link";

interface MainLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  styleMe?: boolean;
}

const MainLink = (params: MainLinkProps) => {
  // import { useRouter } from "next/router"
  const { lang } = useCurrentLang();

  const { href, children, className } = params;

  // bg-white text-[#CAB16C]
  // hover:bg-gradient-to-t from-[#99803B] to-[#CAB16C]
  // hover:text-white duration-300
  // cursor-pointer

  return (
    <Link
      href={`/${lang}/${href}`}
      className={`inline-block ${className} ${
        params?.styleMe
          ? "inline-flex items-center max-lg:text-[14px] justify-center h-[48px] px-5 lg:px-9 bg-white text-[#CA9F5C] rounded-[40px] hover:bg-[#CA9F5C] hover:text-white transition-colors"
          : ""
      } `}
    >
      {children}
    </Link>
  );
  //   return (
  //     <Link
  //       href={`/${lang}/${href}`}
  //       className={`text-white inline-block ${className} ${
  //         params?.styleMe
  //           ? "hover:!bg-transparent hover:!bg-none hover:text-primary hover:!border-primary border duration-500"
  //           : ""
  //       } `}
  //     >
  //       {children}
  //     </Link>
  //   );
};

export default MainLink;
