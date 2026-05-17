// src/features/Case03_Metal/Case03Page.jsx
import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ComicPanel } from '../../components/ComicPanel';
import { WireGame } from './components/WireGame';
import { gsap } from 'gsap';

export const Case03Page = () => {
  const { solveCase } = useGame();

  useEffect(() => {
    gsap.to("#bubble3-1", { scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.3 });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-900 p-6 border-4 border-black shadow-[12px_12px_0px_#000]">
        
        {/* QUADRINHO NARRATIVO */}
        <ComicPanel className="md:col-span-3 min-h-[200px] flex flex-col justify-end bg-neutral-950">
          <div id="bubble3-1" className="bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xl mb-4 shadow-[4px_4px_0_#000] scale-0 origin-bottom-left">
            "Almoxarifado central... Encontrei uma verdadeira bomba-relógio ecológica. Descartaram pilhas ácidas junto com as latas de alumínio recicláveis! Se esses componentes vazarem, inutilizam todo o lote de metal. Preciso isolar os circuitos!"
          </div>
          <h2 className="text-3xl font-black uppercase tracking-wider text-amber-500" style={{ fontFamily: 'Impact' }}>
            Caso #03: Curto-Circuito Químico
          </h2>
        </ComicPanel>

        {/* ARENA DO JOGO DOS FIOS */}
        <div className="md:col-span-3 py-4">
          <WireGame 
            onSuccess={() => {
              solveCase('case3');
              alert("⚡ CIRCUITO ISOLADO COM SUCESSO!\nSensacional, parceiro! O metal foi salvo e o lixo químico nocivo foi destinado para o posto de coleta da Logística Reversa.");
            }} 
          />
        </div>

      </div>
    </div>
  );
};