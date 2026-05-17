// src/App.jsx (Versão Corrigida contra Exploits)
import React, { useState, useEffect } from 'react';
import DossierPanel from './components/DossierPanel';
import MainMenu from './components/MainMenu';
import { Case01Page } from './features/Case01_Plastic/Case01Page';
import { Case02Page } from './features/Case02_Paper/Case02Page';
import { Case03Page } from './features/Case03_Metal/Case03Page';
import { Case04Page } from './features/Case04_Glass/Case04Page';
import { useGame } from './context/GameContext';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';

export default function App() {
  const { gameState, resetGame } = useGame();
  
  const [gameStarted, setGameStarted] = useState(() => {
    return !!gameState.playerName; 
  });

  const allSolved = Object.values(gameState.casesSolved).every(Boolean);

  useEffect(() => {
    if (allSolved) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      gsap.fromTo("#badge-reward", { scale: 0, rotateY: 0 }, { scale: 1, rotateY: 360, duration: 1.2, ease: "back.out(1.5)" });
    }
  }, [allSolved]);

  const handleFullReset = () => {
    resetGame();
    setGameStarted(false);
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 antialiased selection:bg-yellow-400 selection:text-black pb-32">
      {/* Menu Inicial */}
      {!gameStarted && <MainMenu onStart={() => setGameStarted(true)} />}

      {/* Placar do Topo */}
      {gameStarted && <DossierPanel />}

      {/* 🛡️ SISTEMA DE ABAS CONTROLADO POR FASE ATIVA */}
      {!allSolved ? (
        <div className="pt-4">
          {gameStarted && gameState.currentCase === 1 && <Case01Page />}
          {gameStarted && gameState.currentCase === 2 && <Case02Page />}
          {gameStarted && gameState.currentCase === 3 && <Case03Page />}
          {gameStarted && gameState.currentCase === 4 && <Case04Page />}
        </div>
      ) : (
        /* TELA DE VITÓRIA PREMIUM */
        <div className="max-w-md mx-auto pt-32 px-4 text-center flex flex-col items-center justify-center min-h-[70vh]">
          <div id="badge-reward" className="w-40 h-40 bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-600 border-4 border-black rounded-full flex items-center justify-center shadow-[8px_8px_0_#000] text-7xl mb-8 select-none relative">
            <span>{gameState.playerAvatar}</span>
            <span className="absolute top-0 right-0 text-3xl">🥇</span>
          </div>

          <h1 className="text-4xl font-black uppercase tracking-wider text-yellow-400 drop-shadow-[3px_3px_0_#000]" style={{ fontFamily: 'Impact' }}>
            CONCLUÍDO, AGENTE!
          </h1>
          
          <p className="font-mono text-sm text-neutral-400 mt-4 max-w-sm">
            Parabéns, <span className="text-yellow-400 font-bold">{gameState.playerName}</span>! Você e sua mascote varreram o crime ambiental da corporação e garantiram o selo de Guardiões da Sustentabilidade. 🐾
          </p>

          <div className="bg-neutral-900 border-4 border-black px-6 py-2 rounded-md mt-6 shadow-[4px_4px_0_#000]">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase block">Pontuação Final</span>
            <span className="text-2xl font-mono font-black text-emerald-400">{String(gameState.score).padStart(6, '0')} PTS</span>
          </div>

          <button
            onClick={handleFullReset}
            className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-wider border-4 border-black px-8 py-4 rounded-md shadow-[4px_4px_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_#000] transition-all cursor-pointer text-sm"
          >
            🔄 Nova Investigação
          </button>
        </div>
      )}
    </div>
  );
}