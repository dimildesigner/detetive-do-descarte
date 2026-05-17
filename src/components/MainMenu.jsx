// src/components/MainMenu.jsx
import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { gsap } from 'gsap';

export default function MainMenu({ onStart }) {
  const { setGameState } = useGame();
  const [nameInput, setNameInput] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🦮'); // '🦮' para Golden, '🐩' para Poodle

  useEffect(() => {
    gsap.timeline()
      .to("#menu-title", { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" })
      .to("#menu-subtitle", { opacity: 1, duration: 0.5 })
      .to("#menu-form", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return alert("Por favor, digite sua identificação de Agente!");

    // Grava o nome e o avatar escolhido no estado global
    setGameState(prev => ({ 
      ...prev, 
      playerName: nameInput.toUpperCase(),
      playerAvatar: selectedAvatar
    }));
    
    gsap.to("#menu-container", {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      onComplete: onStart
    });
  };

  return (
    <div 
      id="menu-container" 
      className="fixed inset-0 bg-neutral-950 z-50 flex flex-col items-center justify-center px-4 overflow-y-auto"
      style={{ backgroundImage: 'radial-gradient(#1a1a1a 2px, transparent 2px)', backgroundSize: '30px 30px' }}
    >
      <div className="max-w-xl w-full text-center my-8">
        {/* ÍCONE DINÂMICO DE DETETIVE DOG */}
        <div className="text-7xl mb-4 select-none animate-pulse flex justify-center gap-2">
          <span>🕵️‍♂️</span><span>{selectedAvatar}</span>
        </div>

        <h1 
          id="menu-title" 
          className="text-5xl md:text-6xl font-black tracking-tighter text-yellow-400 opacity-0 -translate-y-6 select-none drop-shadow-[4px_4px_0_#000]"
          style={{ fontFamily: 'Impact' }}
        >
          DETETIVE DO DESCARTE
        </h1>
        
        <p id="menu-subtitle" className="font-mono text-xs uppercase tracking-widest text-neutral-500 mt-2 opacity-0">
          Operação Eco-Compliance Corporativo
        </p>

        <form 
          id="menu-form" 
          onSubmit={handleSubmit}
          className="mt-8 bg-neutral-900 border-4 border-black p-6 md:p-8 rounded-md shadow-[12px_12px_0_#000] opacity-0 translate-y-6 text-left"
        >
          {/* SELEÇÃO DE AVATAR */}
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-3">
            Escolha seu Parceiro Investigador:
          </label>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* CARD GOLDEN */}
            <div 
              onClick={() => setSelectedAvatar('🦮')}
              className={`border-4 p-4 rounded-md text-center cursor-pointer transition-all select-none flex flex-col items-center gap-2
                ${selectedAvatar === '🦮' 
                  ? 'bg-amber-500/20 border-yellow-400 shadow-[4px_4px_0_#ca8a04]' 
                  : 'bg-black/40 border-black hover:border-neutral-700'
                }`}
            >
              <span className="text-4xl">🦮</span>
              <div className="font-mono font-black text-xs text-neutral-200">DET. GOLDEN</div>
              <span className="text-[10px] text-neutral-400 font-mono">Consagrado & Focado</span>
            </div>

            {/* CARD POODLE */}
            <div 
              onClick={() => setSelectedAvatar('🐩')}
              className={`border-4 p-4 rounded-md text-center cursor-pointer transition-all select-none flex flex-col items-center gap-2
                ${selectedAvatar === '🐩' 
                  ? 'bg-purple-500/20 border-purple-500 shadow-[4px_4px_0_#7c3aed]' 
                  : 'bg-black/40 border-black hover:border-neutral-700'
                }`}
            >
              <span className="text-4xl">🐩</span>
              <div className="font-mono font-black text-xs text-neutral-200">DET. POODLE</div>
              <span className="text-[10px] text-neutral-400 font-mono">Perspicaz & Estratégica</span>
            </div>
          </div>

          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-2">
            Identificação do Investigador (Nome ou ID):
          </label>
          <input 
            type="text" 
            maxLength={15}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Ex: AGENTE EDDIE" 
            className="w-full bg-black border-4 border-black p-3 font-mono text-sm text-yellow-400 focus:outline-none focus:border-yellow-400 placeholder-neutral-700 rounded-sm font-bold uppercase transition-colors"
          />

          <button
            type="submit"
            className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-wider border-4 border-black py-4 rounded-md shadow-[4px_4px_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_#000] transition-all cursor-pointer text-center text-sm"
          >
            🕵️‍♂️ Iniciar Investigação
          </button>
        </form>
      </div>
    </div>
  );
}