import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Main from './components/main';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state

  // Initially, no card is selected, meaning the Dashboard will be shown
  const [isSelected, setIsSelected] = useState(null);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <BrowserRouter>
        {/* Pass the fullscreen state and toggle function to Header */}
        <div
          className={`${
            isFullscreen ? 'h-screen w-screen fixed top-0 left-0 z-50' : 'h-auto'
          } transition-all duration-300`}
        >
          <Header
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isFullscreen={isFullscreen} // Pass fullscreen state
            toggleFullscreen={toggleFullscreen} // Pass toggle function
          />
          <Main isOpen={isOpen} isFullscreen={isFullscreen} /> {/* Pass fullscreen state to Main */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
