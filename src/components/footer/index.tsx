'use client';
import React from 'react';
import Container from '../shared/formcomponents/Container';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaTiktok, FaWhatsapp, FaSnapchatGhost, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from '../../../navigation';

interface Socials {
  facebook?: string | null;
  x?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  whatsapp?: string | null;
}

interface FooterSettings {
  title: string;
  logo: string;
  logo2?: string;
  logo3?: string;
  footer_text: string;
  footer_logo: string;
  socials: Socials;
}

interface FooterProps {
  settings: FooterSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  const t = useTranslations('footer');

  const socialIcons: { key: keyof Socials; icon: any }[] = [
    { key: 'tiktok', icon: FaTiktok },
    { key: 'whatsapp', icon: FaWhatsapp },
    { key: 'x', icon: FaTwitter },
    { key: 'instagram', icon: FaInstagram },
    { key: 'facebook', icon: FaFacebookF },
    { key: 'linkedin', icon: FaSnapchatGhost },
    { key: 'youtube', icon: FaSnapchatGhost }
  ];

  return (
    <div className="bg-[#597649] lg:h-[436px] py-10">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between w-full">
          
          {/* شعار Footer */}
          <div className="lg:w-1/3 w-full">
            <Image
              src={settings.footer_logo}
              alt="footer-logo"
              width={87.398}
              height={82}
            />
            <p className="text-white mt-3 text-base leading-7">
              {settings.footer_text}
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h2 className="mb-5 text-white font-semibold text-lg">{t('quickLinks')}</h2>
            <ul className="flex gap-6 flex-col text-white">
              <Link href='/about-us' className='flex items-center gap-2'>
                <Image src="/images/home.svg" alt="home" width={14} height={14} />
                <a>{t('plans')}</a>
              </Link>
              <Link href='/our-plans' className='flex items-center gap-2'>
                <Image src="/images/home.svg" alt="home" width={14} height={14} />
                <a>{t('plansss')}</a>
              </Link>
              <Link href='/features' className='flex items-center gap-2'>
                <Image src="/images/home.svg" alt="home" width={14} height={14} />
                <a>{t('features')}</a>
              </Link>
              <Link href='/contact-us' className='flex items-center gap-2'>
                <Image src="/images/home.svg" alt="home" width={14} height={14} />
                <a>{t('contact')}</a>
              </Link>
            </ul>
          </div>

          {/* التواصل الاجتماعي */}
          <div>
            <h2 className="mb-5 text-white font-semibold text-lg">{t('followUs')}</h2>
            <div className="flex items-center gap-3 mt-5">
              {socialIcons.map(({ key, icon: Icon }, i) => {
                const url = settings.socials[key];
                if (!url) return null; // لو الرابط مش موجود ما نعرضش الأيقونة
                return (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-[40px] h-[40px] border border-gray-100 hover:bg-white  rounded-[5px] cursor-pointer flex items-center justify-center">
                    <div className='w-[25px] h-[25px] rounded-[3px] bg-[#597649] flex items-center justify-center'>
                      <Icon className="text-white text-base" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Footer;
