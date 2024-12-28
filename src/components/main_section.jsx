import React, { useState } from 'react';
import Main_Card from './main_card';
import Main_Components from './main_components';
import Dashboard from './ui/dashboard/dashboard';
import AppRoutes from '../routers/approutes';

export default function Main_Section({ isOpen }) {
  const [isSelected, setIsSelected] = useState(null);

  return (
    <div className="bg-gray-50 w-full">
      {/* Always display Main_Card */}
      <Main_Card isOpen={isOpen} isSelected={isSelected} setIsSelected={setIsSelected} />

      {/* Render the routes from AppRoutes */}
      <AppRoutes />
    </div>
  );
}
