"use client";
import React from 'react'
import Container from '../shared/formcomponents/Container'
import ShippingForm from './ShippingForm'
import Image from 'next/image'

const ShippingSolutions = () => {
  return (
    <div className='bg-[#001b0c] py-10'>
      <Container>
        <div className="flex flex-col-reverse lg:flex-row justify-between w-full gap-10 lg:gap-20 items-center">
          
          <div className="lg:w-[60%] w-full text-white text-center lg:text-right">
            <h2 className='lg:text-[28px] lg:w-[473px] leading-[42px] lg:leading-[58px] mx-auto lg:mx-0'>
              نوفر لكم حلول الشحن البرى فى جميع أنحاء المملكة بأقل الأسعار
            </h2>
            <h3 className='mt-[16px]'>
              تسعى شركتنا لتكون وكيل الشحن الخاص بجميع أعمالك داخل المملكة العربية السعودية وخارجها ودليلكم للعديد من الخدمات من خلال نظام متخصص لمتابعة سحناتكم وتوريدها بشكل صحيح .
            </h3>
            <p className='mt-5'>
              سكون فريقنا متواجد على مدار ال 24 ساعة للتواصل معكم والرد على جميع إستفساراتكم عن الشحنات الخاصة بكم وتلقى الدعم الكامل .
            </p>
            <ShippingForm />
          </div>

          <div className="lg:w-[40%] w-full flex justify-center flex-col ">
            <Image
              src='/images/shipping-img.png'
              alt='shipping'
              width={397}
              height={397}
              className="max-w-[300px] lg:max-w-full h-auto"
            />
             <Image
              src='/images/contact-us-line.png'
              alt='shipping'
              width={620.9981079101562}
              height={534.5243530273438}
              className="-mt-44"
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ShippingSolutions
