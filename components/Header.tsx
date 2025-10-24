
import React from 'react';
import { ChartBarIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-20 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ChartBarIcon className="h-8 w-8 text-brand-blue" />
          <span className="text-xl font-bold text-white tracking-wider">Web Traffic Futures</span>
        </div>
        {/* Placeholder for future nav items */}
      </div>
    </header>
  );
};

export default Header;
