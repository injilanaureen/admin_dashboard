import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Main from './components/main';
import { useState } from 'react';
import AppRoutes from './routers/approutes';
function App() {

  const [isOpen, setIsOpen] = useState(false);
    // Initially, no card is selected, meaning the Dashboard will be shown

  const [isSelected, setIsSelected] = useState(null);


  return (
    <>
    <BrowserRouter>
    <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
    <Main isOpen={isOpen}/>
    </BrowserRouter>
    </>
  );
}

export default App;
