import React from 'react';
import { MdPhoneInTalk } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

const DirectContact = ({ directMobile }: { directMobile: string }) => {
  const cleanedMobile = directMobile.replace(/\D/g, '');

  return (
    <div className="fixed bottom-10 right-10 z-[9999]">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-lg border border-gray-200">
        
        <a
        title='أتصل بنا'
          href={`tel:${cleanedMobile}`}
          className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition cursor-pointer"
        >
          <MdPhoneInTalk className="text-blue-600 text-2xl" />
        </a>

        <a
        title='راسلنا علي الواتساب'
          href={`https://wa.me/${cleanedMobile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition cursor-pointer"
        >
          <FaWhatsapp className="text-green-600 text-2xl" />
        </a>
        
      </div>
    </div>
  );
};

export default DirectContact;
