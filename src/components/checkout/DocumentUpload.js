import React from 'react';
import { UploadCloud, AlertCircle, FileText } from 'lucide-react';

export default function DocumentUpload({ file, fileError, handleFileChange, onBack, onNext }) {
  return (
    <div className="space-y-6 fade-in">
      <h3 className="font-montserrat font-bold text-xl text-gray-900 dark:text-white mb-2">Formato de aprobación</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-inter mb-4">Adjunta el documento debidamente diligenciado. Este paso es obligatorio para validar tu cupo.</p>
      
      <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl cursor-pointer bg-gray-50 dark:bg-[#121212] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all relative overflow-hidden group">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud size={48} className="text-[#00A8A8] mb-3 group-hover:scale-110 transition-transform" />
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-300 font-inter"><span className="font-semibold text-[#C62828]">Haz clic para subir</span> o arrastra el archivo</p>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">PDF (Máximo 5MB)</p>
        </div>
        <input type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
      </label>
      
      {fileError && <p className="text-red-500 text-sm font-inter mt-2 flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-100"><AlertCircle size={16}/> {fileError}</p>}
      {file && <p className="text-[#00A8A8] text-sm font-inter font-medium mt-2 flex items-center gap-2 bg-[#00A8A8]/10 p-3 rounded-lg border border-[#00A8A8]/20"><FileText size={16}/> {file.name}</p>}

      <div className="pt-6 flex justify-between gap-4">
        <button onClick={onBack} className="px-6 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-inter font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto text-center">Atrás</button>
        <button disabled={!file} onClick={onNext} className="px-8 py-4 bg-[#C62828] text-white font-inter font-semibold rounded-xl disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-colors shadow-md w-full sm:w-auto text-center">Revisar solicitud</button>
      </div>
    </div>
  );
}