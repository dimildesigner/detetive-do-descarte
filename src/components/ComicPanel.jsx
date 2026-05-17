// src/components/ComicPanel.jsx
import React from 'react';

export const ComicPanel = ({ children, className = '' }) => {
  return (
    <div className={`relative border-4 border-black p-6 rounded-none overflow-hidden bg-neutral-900 shadow-[6px_6px_0_#000] ${className}`}>
      {/* Camada de textura de pontinhos de gibi antigo */}
      <div className="absolute inset-0 bg-comic-dots pointer-events-none opacity-40"></div>
      
      {/* Conteúdo do painel (textos, balões) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};