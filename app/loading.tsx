import Image from "next/image";
import logo from '@/public/images/footer-logo.svg'
export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
       <Image
              src={logo}
              alt="Logo"
              width={320}
              height={320}
              className="object-cover logo-loading"
            />
    </div>
  );
}
