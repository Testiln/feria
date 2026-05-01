'use client';

import React, { useState } from 'react';

const isLegacyPlaceholder = (imageUrl = '') => {
  const normalized = String(imageUrl).toLowerCase();
  return (
    normalized.includes('via.placeholder.com') ||
    normalized.includes('text=mueble') ||
    (normalized.includes('<text') && normalized.includes('mueble')) ||
    (normalized.includes('%3ctext') && normalized.includes('mueble'))
  );
};

export default function ProductImage({ src, alt, className = '', imgClassName = '' }) {
  const [hasError, setHasError] = useState(false);
  const showPlaceholder = !src || hasError || isLegacyPlaceholder(src);

  if (showPlaceholder) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F5F5] to-[#E5E7EB] dark:from-[#2B2B2B] dark:to-[#1F1F1F] ${className}`}
        aria-label="Imagen del producto no disponible"
      >
        <div className="absolute inset-0 bg-white/30 dark:bg-black/20" />
        <svg className="relative z-10 h-10 w-10 stroke-[#9CA3AF] dark:stroke-[#A1A1AA]" viewBox="0 0 24 24" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
          <circle cx="8.5" cy="8.5" r="2" />
          <path d="M21 15l-4-4a2 2 0 0 0-2.828 0L5 21" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${imgClassName} ${className}`.trim()}
      onError={() => setHasError(true)}
    />
  );
}
