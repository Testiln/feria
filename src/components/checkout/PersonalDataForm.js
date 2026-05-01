import React from 'react';

export default function PersonalDataForm({ formData, setFormData, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="font-montserrat font-bold text-xl text-gray-900 dark:text-white mb-4">Datos personales</h3>
      <div>
        <label className="block font-inter text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre completo</label>
        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C62828] outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
      </div>
      <div>
        <label className="block font-inter text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cédula de ciudadanía</label>
        <input required type="number" value={formData.idDoc} onChange={e => setFormData({...formData, idDoc: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C62828] outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
      </div>
      <div>
        <label className="block font-inter text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C62828] outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
      </div>
      <div>
        <label className="block font-inter text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#C62828] outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
      </div>
      <div className="pt-4 flex justify-center">
        <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-[#C62828] text-white font-inter font-semibold rounded-xl hover:bg-[#8E1C1C] transition-colors shadow-md">
          Siguiente paso
        </button>
      </div>
    </form>
  );
}