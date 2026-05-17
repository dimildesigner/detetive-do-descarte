// src/components/DossierPanel.jsx
import React from "react";
import { useGame } from "../context/GameContext";

export default function DossierPanel() {
  const { gameState } = useGame();

  // Conta quantos casos já foram marcados como TRUE no contexto
  const totalSolved = Object.values(gameState.casesSolved).filter(
    Boolean,
  ).length;

  return (
    <div className="fixed top-0 left-0 w-full bg-neutral-900 border-b-4 border-black z-50 px-6 py-3 flex justify-between items-center shadow-[0_4px_0_#000]">
      {/* PERFIL DO AGENTE */}
      <div className="flex items-center gap-4">
        {/* CONTAINER DO AVATAR COM POSICIONAMENTO CORRIGIDO */}
        <div className="relative flex items-center justify-center w-12 h-12 bg-neutral-950 border-2 border-black rounded-md shadow-[2px_2px_0_#000] select-none text-3xl">
          {/* Emoji do Detetive Principal */}
          <span className="z-10">🕵️‍♂️</span>

          {/* Emoji do Dog Parceiro - Ajustado para não sobrepor */}
          <span className="absolute bottom-[-6px] right-[-8px] text-base bg-yellow-400 border-2 border-black rounded-full w-6 h-6 flex items-center justify-center z-20 shadow-[1px_1px_0_#000]">
            {gameState.playerAvatar}
          </span>
        </div>

        <div>
          <div className="font-black text-[10px] uppercase tracking-widest text-neutral-500 leading-none mb-1">
            Status do Agente
          </div>
          <div className="font-mono font-black text-xs text-yellow-400 tracking-wide uppercase">
            AGENTE: {gameState.playerName || "INVESTIGADOR"}
          </div>
        </div>
      </div>
      {/* DOSSIÊ DE CASOS RESOLVIDOS */}
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <div className="font-black text-xs uppercase tracking-widest text-neutral-400">
            Casos Arquivados
          </div>
          <div className="font-mono font-bold text-sm text-emerald-400">
            {totalSolved} de 4 CRIMES RESOLVIDOS
          </div>
        </div>

        {/* BARRA DE PROGRESSO EM ESTILO HQ (BLOCOS) */}
        <div className="flex gap-1 bg-black p-1 border-2 border-black rounded-sm">
          <div
            className={`w-6 h-4 border border-neutral-700 transition-colors duration-500 ${gameState.casesSolved.case1 ? "bg-red-500" : "bg-neutral-800"}`}
            title="Caso 1: Plástico"
          ></div>
          <div
            className={`w-6 h-4 border border-neutral-700 transition-colors duration-500 ${gameState.casesSolved.case2 ? "bg-blue-500" : "bg-neutral-800"}`}
            title="Caso 2: Papel"
          ></div>
          <div
            className={`w-6 h-4 border border-neutral-700 transition-colors duration-500 ${gameState.casesSolved.case3 ? "bg-yellow-500" : "bg-neutral-800"}`}
            title="Caso 3: Metal"
          ></div>
          <div
            className={`w-6 h-4 border border-neutral-700 transition-colors duration-500 ${gameState.casesSolved.case4 ? "bg-emerald-500" : "bg-neutral-800"}`}
            title="Caso 4: Vidro"
          ></div>
        </div>
      </div>
      {/* SCORE / PONTUAÇÃO DO JOGADOR */}
      <div className="bg-black border-2 border-black px-4 py-1 rounded-sm shadow-[2px_2px_0_#000]">
        <div className="font-black text-[10px] uppercase tracking-widest text-neutral-500 text-center">
          Score
        </div>
        <div className="font-mono font-black text-md text-yellow-400 tracking-wider">
          {String(gameState.score).padStart(6, "0")}
        </div>
      </div>
    </div>
  );
}
