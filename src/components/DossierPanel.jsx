// src/components/DossierPanel.jsx
import React, { useState, useRef } from "react";
import { useGame } from "../context/GameContext";
import imgLogo from "../assets/logo_detetive_descarte.svg";

// 🎵 Importação da trilha de mistério (ponteiro para seu arquivo mp3 real)
import trilhaMisterio from "../assets/audio/trilha_misterio.mp3";

export default function DossierPanel() {
  const { gameState } = useGame();
  const [isMuted, setIsMuted] = useState(true); // Inicia silenciado por padrão para climatizar sob escolha

  const audioRef = useRef(null);

  // Conta quantos casos já foram marcados como TRUE no contexto
  const totalSolved = Object.values(gameState.casesSolved).filter(
    Boolean,
  ).length;

  // Lógica inteligente para alternar o áudio entre play/pause e mute
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Toca o áudio e desmuta
        audioRef.current.play().catch(err => console.log("Permissão de áudio requerida pelo navegador."));
        audioRef.current.muted = false;
      } else {
        // Muta o áudio
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-neutral-900 border-b-4 border-black z-50 px-6 py-3 flex flex-wrap gap-4 justify-between items-center shadow-[0_4px_0_#000]">
      
      {/* COMPONENTE DE ÁUDIO INVISÍVEL COM LOOP ATIVO */}
      <audio ref={audioRef} src={trilhaMisterio} loop muted={isMuted} />

      {/* PERFIL DO AGENTE */}
      <div className="flex items-center gap-4">
        {/* CONTAINER DO AVATAR COM POSICIONAMENTO CORRIGIDO */}
        <div className="relative flex items-center justify-center w-12 h-12 bg-neutral-950 border-2 border-black rounded-md shadow-[2px_2px_0_#000] select-none">
          {/* Logotipo substituindo o emoji no centro perfeito */}
          <img
            src={imgLogo}
            alt="Logotipo Detetive do Descarte"
            className="w-8 h-8 object-contain z-10"
          />

          {/* Emoji do Dog Parceiro - Ajustado para não sobrepor */}
          <span className="absolute bottom-[-6px] right-[-8px] text-base bg-yellow-400 border-2 border-black rounded-full w-8 h-8 flex items-center justify-center z-20 shadow-[1px_1px_0_#000]">
            {gameState.playerAvatar}
          </span>
        </div>

        <div>
          <div className="font-black text-[10px] uppercase tracking-widest text-neutral-500 leading-none mb-1">
            Agente:
          </div>
          <div className="font-mono font-black text-lg text-yellow-300 tracking-wide uppercase">
             {gameState.playerName || "INVESTIGADOR"}
          </div>
        </div>
      </div>

      {/* ⚙️ CONTROLE DE CLIMATIZAÇÃO (Botão de Áudio Noir entre o Perfil e o Progresso) */}
      <div className="flex items-center">
        <button
          onClick={toggleAudio}
          className={`px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-wider border-2 border-black rounded-sm transition-all shadow-[2px_2px_0_#000] active:translate-y-0.5 active:shadow-none cursor-pointer
            ${isMuted 
              ? "bg-neutral-800 text-neutral-400 border-neutral-700" 
              : "bg-yellow-400 text-black border-black font-extrabold animate-pulse"
            }`}
        >
          {isMuted ? "🔇 INVESTIGAÇÃO EM SILÊNCIO" : "🔊 TRILHA SONORA ATIVA"}
        </button>
      </div>

      {/* DOSSIÊ DE CASOS RESOLVIDOS */}
      <div className="flex items-center gap-6">
        <div className="text-right hidden md:block">
          <div className="font-black text-xs uppercase tracking-widest text-neutral-400">
            Casos Arquivados
          </div>
          <div className="font-mono font-bold text-sm text-emerald-500">
            CRIMES RESOLVIDOS: {totalSolved} de 4
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
            className={`w-6 h-4 border border-neutral-700 transition-colors duration-500 ${gameState.casesSolved.case3 ? "bg-orange-500" : "bg-neutral-800"}`}
            title="Caso 3: Metal"
          ></div>
          <div
            className={`w-6 h-4 border border-neutral-700 transition-colors duration-500 ${gameState.casesSolved.case4 ? "bg-green-600" : "bg-neutral-800"}`}
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