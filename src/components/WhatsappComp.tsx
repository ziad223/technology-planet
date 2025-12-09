import React from 'react'
import Image from 'next/image'
import Container from './shared/formcomponents/Container'

interface WhatsappCompProps {
  whatsapp: string
  email: string
}

const WhatsappComp: React.FC<WhatsappCompProps> = ({ whatsapp, email }) => {
  return (
    <div className="fixed bottom-10 left-0 w-full px-6 md:px-12 lg:px-20 z-[99]">
      <div className="flex items-center justify-between w-full">
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/whatsaap-header.svg"
            alt="whatsapp"
            width={73}
            height={73}
            className="rounded-full md:w-[73px] w-[55px] md:h-[73px] h-[55px] cursor-pointer"
          />
        </a>

        {/* أيقونة الإيميل - يمين */}
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/header-emaill.svg"
            alt="email"
            width={73}
            height={73}
            className="rounded-full md:w-[73px] w-[55px] md:h-[73px] h-[55px] cursor-pointer"
          />
        </a>
      </div>
    </div>
  )
}

export default WhatsappComp
