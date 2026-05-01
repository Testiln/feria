import React from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

export default function Navbar({ onBack, darkMode, setDarkMode, maxWidthClass = "max-w-[1600px]" }) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors flex items-center gap-2">
            <ArrowLeft size={20} />
          </button>
          <div 
            onClick={onBack}
            className="text-[#C62828] font-montserrat font-black text-2xl tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
          >
            jamar<span className="text-xs align-top">®</span>
          </div>
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}