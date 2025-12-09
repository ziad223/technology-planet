import React from 'react'

const ShippingForm = () => {
  return (
    <form className='mt-5 flex flex-col gap-3'>
      
      <input
        type="text"
        className='w-full h-[60px] bg-transparent outline-none border border-white px-5 rounded-[45px]'
        placeholder='الإسم'
      />

      <div className='flex flex-col lg:flex-row items-center gap-3 mt-2'>
        <input
          type="text"
          className='w-full h-[60px] bg-transparent outline-none border border-white px-5 rounded-[45px]'
          placeholder='رقم الجوال'
        />
        <input
          type="text"
          className='w-full h-[60px] bg-transparent outline-none border border-white px-5 rounded-[45px]'
          placeholder='الإلكترونى'
        />
      </div>

      <textarea
        className='w-full bg-transparent outline-none border border-white px-5 rounded-[25px] py-[10px] h-[124px]'
        placeholder='نص الرسالة'
      ></textarea>

      <button className='bg-[#008039] h-[60px] lg:w-[295px] rounded-[10px] text-white mt-[30px] w-full '>
        إرسال
      </button>

    </form>
  )
}

export default ShippingForm
