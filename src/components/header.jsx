import React, { useState } from 'react';


export default function Header({isOpen,setIsOpen}) {

  return (
    <div className=' bg-red-500 flex items-center justify-between pl-4 md:pl-6 lg:pl-8 pr-2 md:pr-4 lg:pr-6'>
        
         <div className='flex gap-3 md:gap-4 lg:gap-5 p-2 md:p-3 lg:p-4 items-center justify-center'>
        {isOpen ? <h3 className='text-lg md:text-xl lg:text-2xl font-semibold tracking-tigh text-white'>Administrator</h3> : <img src="/images/home.svg" className='size-5 md:size-6 lg:size-7'/>}
            <img className=' size-4 md:size-4 lg:size-6 ' src="/images/waffle-menu.png" alt="dropdown" onClick={()=>{setIsOpen(!isOpen)}}/>
          </div> 
      
           <div className='flex gap-4 md:gap-6 lg:gap-8  items-center justify-center'>
            <img src="/images/message.svg" alt="message" className='size-4 md:size-5 lg:size-6 ' />
            <img src="/images/alert.svg" alt="message" className='size-4 md:size-5 lg:size-6 ' />
            <img src="/images/expand.svg" alt="message" className='size-4 md:size-5 lg:size-6 ' />
            <img src="/images/calender.svg" alt="message" className='size-4 md:size-5 lg:size-6 ' />
            <img src="/images/user.svg" alt="message" className='size-4 md:size-5 lg:size-6 ' />
           </div>
        </div>
  )
}
