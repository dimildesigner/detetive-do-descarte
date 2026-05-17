// src/features/Case01_Plastic/components/DragDropGame.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Registra o plugin no GSAP para evitar problemas de escopo no React
gsap.registerPlugin(Draggable);

export const DragDropGame = ({ onSuccess }) => {
  const containerRef = useRef(null);
  const bottleRef = useRef(null);
  const targetBinRef = useRef(null);

  useEffect(() => {
    // Armazena referências locais para o escopo do Draggable
    const targetBin = targetBinRef.current;
    const bottle = bottleRef.current;

    // Cria a instância do Draggable do GSAP no elemento da garrafa
    const draggableInstance = Draggable.create(bottle, {
      type: "x,y",
      bounds: containerRef.current, // Limita o movimento dentro da arena do jogo
      edgeResistance: 0.65,
      onRelease: function () {
        // Verifica se a garrafa colidiu com pelo menos 50% da lixeira correta
        if (this.hitTest(targetBin, "50%")) {
          // Efeito de sucesso: a garrafa entra na lixeira (diminui escala e opacidade)
          gsap.to(bottle, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              // Dispara a função de sucesso que avisa o componente pai (Case01Page)
              onSuccess();
            }
          });
        } else {
          // Se soltar no lugar errado ou fora, volta elástico para a posição inicial
          gsap.to(bottle, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "bounce.out"
          });
        }
      }
    });

    // Limpeza de memória do React ao desmontar o componente
    return () => {
      if (draggableInstance[0]) draggableInstance[0].kill();
    };
  }, [onSuccess]);

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-[350px] bg-neutral-900 border-4 border-black rounded-lg p-6 flex flex-col justify-between items-center relative overflow-hidden select-none"
      style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}
    >
      <div className="text-sm font-mono text-center text-neutral-400 font-bold uppercase tracking-wider">
        Arraste a evidência para a lixeira correta!
      </div>

      {/* A GARRAFA ARRASTÁVEL */}
      <div 
        ref={bottleRef} 
        className="text-6xl cursor-grab active:cursor-grabbing z-30 touch-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
      >
        🍾
      </div>

      {/* AS LIXEIRAS DE CORES DIFERENTES (ESTILO HQ) */}
      <div className="flex justify-around w-full gap-4 mt-auto">
        <div className="w-24 h-28 bg-blue-600 border-4 border-black rounded-md flex flex-col items-center justify-center font-black text-black text-xs shadow-[4px_4px_0_#000]">
          📄 <span className="bg-white px-1 border border-black rounded-sm mt-2 text-[9px]">PAPEL</span>
        </div>
        
        {/* ALVO CORRETO */}
        <div 
          ref={targetBinRef} 
          className="w-28 h-32 bg-red-500 border-4 border-black rounded-md flex flex-col items-center justify-center font-black text-black text-sm shadow-[4px_4px_0_#000] scale-105 transition-transform"
        >
          ♻️ <span className="bg-white px-2 py-0.5 border border-black rounded-sm mt-2 text-[10px]">PLÁSTICO</span>
        </div>

        <div className="w-24 h-28 bg-emerald-600 border-4 border-black rounded-md flex flex-col items-center justify-center font-black text-black text-xs shadow-[4px_4px_0_#000]">
          🥛 <span className="bg-white px-1 border border-black rounded-sm mt-2 text-[9px]">VIDRO</span>
        </div>
      </div>
    </div>
  );
};