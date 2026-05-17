// src/features/Case04_Glass/Case04Page.jsx
import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ComicPanel } from '../../components/ComicPanel';
import { ProtocolGame } from './components/ProtocolGame';
import { gsap } from 'gsap';

export const Case04Page = () => {
  const { solveCase } = useGame();

  useEffect(() => {
    gsap.to("#bubble4-1", { scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.3 });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-32 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-900 p-6 border-4 border-black shadow-[12px_12px_0px_#000]">
        
        {/* QUADRINHO NARRATIVO */}
        <ComicPanel className="md:col-span-3 min-h-[200px] flex flex-col justify-end bg-neutral-950">
          <div id="bubble4-1" className="bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xl mb-4 shadow-[4px_4px_0_#000] scale-0 origin-bottom-left">
            "Última parada: Oficina de Manutenção. Uma lâmpada fluorescente e copos de vidro caíram no chão, estilhaçando tudo. Deixar isso exposto é um crime contra a segurança da equipe de limpeza. Vamos aplicar o protocolo padrão!"
          </div>
          <h2 className="text-3xl font-black uppercase tracking-wider text-emerald-500" style={{ fontFamily: 'Impact' }}>
            Caso #04: Estilhaços Ocultos
          </h2>
        </ComicPanel>

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