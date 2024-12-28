import React from 'react'
import Sidebar from './sidebar';
import Main_Section from './main_section';

export default function Main({isOpen}) {
  return (
    <div className='flex h-screen'>
      <Sidebar isOpen={isOpen}/>
      <Main_Section  isOpen={isOpen}/>
    </div>

  )
}
