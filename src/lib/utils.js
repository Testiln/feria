/**
 * Formatea un número al formato de moneda peso colombiano (COP).
 * @param {number} price - El precio a formatear
 * @returns {string} Precio formateado (ej. $ 1.250.000)
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    maximumFractionDigits: 0 
  }).format(price);
};