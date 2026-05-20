// src/features/Case04_Glass/Case04Page.jsx
import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ProtocolGame } from './components/ProtocolGame';
import { gsap } from 'gsap';

// 🎨 Importando a espetacular ilustração do topo
import imgCaso04Top from "../../assets/caso04.png";

export const Case04Page = () => {
  const { solveCase } = useGame();

  useEffect(() => {
    gsap.to("#bubble4-1", { scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.3 });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-32 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-900 p-6 border-4 border-black shadow-[12px_12px_0px_#000]">
        
        {/* QUADRINHO NARRATIVO - Sangrado total e imagem focada no chão (object-bottom) */}
        <div className="md:col-span-3 relative min-h-[250px] border-4 border-black overflow-hidden bg-black shadow-[4px_4px_0_#000]">
          <img
            src={imgCaso04Top}
            alt="Investigação de Vidros"
            className="absolute inset-0 w-full h-full object-cover object-bottom opacity-75" // 🎯 object-bottom foca a coleta no chão!
          />
          <div className="relative z-10 p-6 h-full flex flex-col justify-between items-start">
            <div id="bubble4-1" className="bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xl mb-4 shadow-[4px_4px_0_#000] scale-0 origin-bottom-left text-xs md:text-sm">
              "Última parada: Oficina de Manutenção. Uma lâmpada fluorescente e copos de vidro caíram no chão, estilhaçando tudo. Deixar isso exposto é um crime contra a segurança da equipe de limpeza. Vamos aplicar o protocolo padrão!"
            </div>
            <h2 className="text-3xl font-black uppercase tracking-wider text-emerald-400 drop-shadow-[2px_2px_0_#000]" style={{ fontFamily: 'Impact' }}>
              Caso #04: Estilhaços Ocultos
            </h2>
          </div>
        </div>

        {/* ARENA DO JOGO DE SEQUÊNCIA */}
        <div className="md:col-span-3 flex justify-center items-center py-4">
          <ProtocolGame 
            onSuccess={() => {
              solveCase('case4');
              alert("🎉 CASO ENCERRADO!\nParabéns, Agente! Você seguiu as normas perfeitamente, evitou acidentes e concluiu o treinamento de Descarte Consciente!");
            }} 
          />
        </div>

      </div>
    </div>
  );
};