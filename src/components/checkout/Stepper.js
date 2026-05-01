import React from 'react';

export default function Stepper({ step }) {
  const progressWidth = `${Math.max(0, ((step - 1) / 2) * (100 * 2/3))}%`

  return (
    <div className="mb-8 mx-auto w-full max-w-2xl px-2 sm:px-6">
      <div className="relative mb-5">
        <div className="absolute left-[16.666%] right-[16.666%] top-5 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div
          className="absolute left-[16.666%] top-5 h-1.5 overflow-hidden rounded-full bg-[#C62828] transition-[width] duration-300"
          style={{ width: progressWidth }}
        ></div>
        <div className="relative z-10 flex items-start justify-between gap-2 sm:gap-4">
          {['Datos personales', 'Documento', 'Confirmar'].map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step >= stepNumber;
            return (
              <div key={label} className="flex flex-col items-center flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${isActive ? 'bg-[#C62828] text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                  {stepNumber}
                </div>
                <span className={`mt-2 text-xs md:text-sm font-inter font-semibold hidden sm:block text-center ${isActive ? 'text-[#C62828]' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}