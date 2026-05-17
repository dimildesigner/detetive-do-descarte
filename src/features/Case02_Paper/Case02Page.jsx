// src/features/Case02_Paper/Case02Page.jsx
import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { ComicPanel } from '../../components/ComicPanel';
import { MemoryGrid } from './components/MemoryGrid';
import { gsap } from 'gsap';

export const Case02Page = () => {
  const { solveCase } = useGame();

  useEffect(() => {
    // Efeito pop-up sequencial nos diálogos da cena 2
    gsap.timeline()
      .to("#bubble2-1", { scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.3 });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-900 p-6 border-4 border-black shadow-[12px_12px_0px_#000]">
        
        {/* QUADRINHO NARRATIVO 1 */}
        <ComicPanel className="md:col-span-3 min-h-[200px] flex flex-col justify-end bg-neutral-950">
          <div id="bubble2-1" className="bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xl mb-4 shadow-[4px_4px_0_#000] scale-0 origin-bottom-left">
            "Área de escritórios... O segundo crime ambiental foi cometido aqui na mesa do RH. Muito papel misturado e papéis de delivery engordurados jogados de qualquer jeito. Vamos botar ordem nessa mesa!"
          </div>
          <h2 className="text-3xl font-black uppercase tracking-wider text-blue-400" style={{ fontFamily: 'Impact' }}>
            Caso #02: O Mistério das Cartas
          </h2>
        </ComicPanel>

        {/* ARENA DO JOGO DA MEMÓRIA */}
        <div className="md:col-span-3 flex justify-center items-center py-4">
          <MemoryGrid 
            onSuccess={() => {
              solveCase('case2');
              alert("🏆 EXCELENTE DETETIVE!\nVocê arquivou a papelada corretamente e aprendeu que papel sujo quebra o processo de reciclagem!");
            }} 
          />
        </div>

      </div>
    </div>
  );
};