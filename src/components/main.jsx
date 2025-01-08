import React from 'react';
import Sidebar from './sidebar';
import Main_Section from './main_section';

export default function Main({ isOpen, isFullscreen }) {
  return (
    <div
      className={`flex ${isFullscreen ? 'h-screen w-screen' : 'h-auto'} transition-all duration-300`}
    >
      <Sidebar isOpen={isOpen} isFullscreen={isFullscreen} />
      <Main_Section isOpen={isOpen} isFullscreen={isFullscreen} />
    </div>
  );
}
