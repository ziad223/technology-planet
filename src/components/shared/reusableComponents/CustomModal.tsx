import React, { useEffect, useState } from 'react';


type ModalProps ={
    children: React.ReactNode
    title?: string
    openCloseModal: React.Dispatch<React.SetStateAction<boolean>>
   
}

const CustomModal = (props: ModalProps) => {
    const closeModal = () => {
        props.openCloseModal((prevState) => !prevState);
        
        
    };
    return (
        <>
            <div id="crud-modal" aria-hidden="true" className="fixed top-0 right-0 left-0 w-full z-[999] flex justify-center items-center  h-[100%] bg-gray-800 bg-opacity-80">
                <div className="relative p-4 flex justify-center  flex-col w-[40%]    max-h-[100%] ">
            
                    <div className="relative w-full flex flex-col  bg-white overflow-x-auto  rounded-[30px] p-4  shadow dark:bg-gray-700">
                        
                        

                        {props.children}
                      
                    <button onClick={closeModal} className='text-[14px] text-[#969696]'>إغلاق</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomModal;
