import React from 'react';
import Sidebar_items from './ui/sidebar_items';
import sidebarData from '../data/sidebar_items.json';

export default function Sidebar({isOpen}) {
  return (
    <div className='flex flex-col bg-white gap-6 border-r border-gray-200'>
   
      

        <div className='flex items-center gap-3 md:gap-4 lg:gap-5 px-2 md:px-2 lg:px-3 py-2 md:py-3 lg:py-5'>
          <img src="/images/waiter_1155216.png" className='size-5 md:size-6 lg:size-8 rounded-2xl bg-white' alt="" />
          { isOpen &&(
            <div className='flex flex-col'>
              <p className='text-sm	font-normal	md:text-base md:font-normal lg:text-lg lg:font-medium'>Hi, Injila </p>
              <p className='text-sm md:text-base lg:text-lg text-gray-600'>Balance: 00</p>
            </div>
          )}  
        </div>
      
        { isOpen &&(
      <div className='flex gap-2 px-4'><img src="/images/right_finger.svg" className='size-3 md:size-4 lg:size-5' alt="" /><span className='text-slate-400 text-xs tracking-tight'>MAIN NAVIGATION</span></div>
        )}

      <ul className='flex flex-col  gap-5 md:gap-6 lg:gap-7 '>
      {
      sidebarData.map((item,index)=>(
       <li key={index} className='flex items-center'><Sidebar_items title={item.title} image={item.image}  children={item.children} isClicked={isOpen}/></li>
      ))
     }
      </ul>
    
    </div>
  )
}
