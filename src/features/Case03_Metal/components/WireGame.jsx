// src/features/Case03_Metal/components/WireGame.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export const WireGame = ({ onSuccess }) => {
  const arenaRef = useRef(null);
  const dragPlugRef = useRef(null);
  const wirePathRef = useRef(null);
  const targetReversaRef = useRef(null);
  const targetMetalRef = useRef(null);
  const originRef = useRef(null);

  const jackMetalRef = useRef(null);
  const jackReversaRef = useRef(null);

  const [gameSolved, setGameSolved] = useState(false);

  // Função que calcula e desenha a curva do fio elétrico entre a origem e o plugue
  const updateWire = () => {
    if (
      !arenaRef.current ||
      !originRef.current ||
      !dragPlugRef.current ||
      !wirePathRef.current
    )
      return;

    const arenaRect = arenaRef.current.getBoundingClientRect();
    const originRect = originRef.current.getBoundingClientRect();
    const plugRect = dragPlugRef.current.getBoundingClientRect();

    // Ponto de partida (lado direito do bloco das pilhas)
    const startX = originRect.right - arenaRect.left - 10;
    const startY = originRect.top + originRect.height / 2 - arenaRect.top;

    // Ponto atual do plugue que está sendo arrastado
    const currentX = plugRect.left + plugRect.width / 2 - arenaRect.left;
    const currentY = plugRect.top + plugRect.height / 2 - arenaRect.top;

    // Cálculo da Curva de Bézier Cúbica para dar o peso e maleabilidade de um cabo real
    const controlX = startX + (currentX - startX) / 2;
    wirePathRef.current.setAttribute(
      "d",
      `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${currentY}, ${currentX} ${currentY}`,
    );
  };

  useEffect(() => {
    setTimeout(updateWire, 100);

    const dragPlug = dragPlugRef.current;
    const targetReversa = targetReversaRef.current;
    const targetMetal = targetMetalRef.current;
    const jackReversa = jackReversaRef.current;

    // Função de reset movida para dentro do escopo correto do useEffect
    const resetWire = () => {
      gsap.to(dragPlug, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: updateWire,
      });
    };

    const draggableInstance = Draggable.create(dragPlug, {
      type: "x,y",
      bounds: arenaRef.current,
      edgeResistance: 0.7,
      onDrag: updateWire,
      onRelease: function () {
        // ACERTO: Pilhas na Logística Reversa (Roxo)
        if (this.hitTest(targetReversa, "30%")) {
          setGameSolved(true);
          this.disable(); // Trava o arrastar IMEDIATAMENTE para não haver conflito gráfico

          const arenaRect = arenaRef.current.getBoundingClientRect();
          const jackRect = jackReversa.getBoundingClientRect();
          const plugRect = dragPlug.getBoundingClientRect();

          // CÁLCULO CIRÚRGICO: Descobre a distância exata necessária baseada no scroll real da tela
          const targetX = (jackRect.left + jackRect.width / 2) - (plugRect.left - this.x + plugRect.width / 2);
          const targetY = (jackRect.top + jackRect.height / 2) - (plugRect.top - this.y + plugRect.height / 2);

          // Anima o encaixe perfeito sem repulsão
          gsap.to(dragPlug, {
            x: targetX,
            y: targetY,
            duration: 0.25,
            ease: "back.out(1.2)",
            onUpdate: updateWire,
            onComplete: () => {
              onSuccess();
            }
          });
        } 
        // ERRO: Tentou jogar pilha na lixeira de metal amarela comum
        else if (this.hitTest(targetMetal, "30%")) {
          alert("⚠️ CURTO-CIRCUITO!\nPilhas e baterias contêm ácidos corrosivos e metais pesados perigosos. Elas NÃO podem ir para a lixeira de metal comum! Devem ir para o posto de Logística Reversa.");
          resetWire();
        } 
        else {
          resetWire();
        }
      },
    });

    return () => {
      if (draggableInstance[0]) draggableInstance[0].kill();
    };
  }, [onSuccess]);

  return (
    <div
      ref={arenaRef}
      className="w-full min-h-[400px] bg-neutral-900 border-4 border-black rounded-lg p-8 flex justify-between items-center relative overflow-hidden select-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(51,51,51,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(51,51,51,0.3) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    >
      {/* RENDER DO CABO DINÂMICO VIA SVG */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <path
          ref={wirePathRef}
          stroke="#ffcc00"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* COLUNA DA ESQUERDA: ORIGEM DOS MATERIAIS */}
      <div className="flex flex-col gap-12 z-20">
        <div className="w-40 p-4 bg-neutral-800 border-4 border-black font-black text-xs text-center rounded-md shadow-[4px_4px_0_#000]">
          🥫 LATAS DE ALUMÍNIO
          <div className="w-4 h-4 bg-yellow-500 border-2 border-black rounded-full absolute right-[-8px] top-1/2 -translate-y-1/2 opacity-40"></div>
        </div>

        {/* ALVO DO ARRASTAR */}
        <div
          ref={originRef}
          className="w-40 p-4 bg-neutral-800 border-4 border-black font-black text-xs text-center rounded-md shadow-[4px_4px_0_#000] relative"
        >
          🔋 PILHAS USADAS
          <div
            ref={dragPlugRef}
            className="w-6 h-6 bg-yellow-400 border-3 border-black rounded-full absolute right-[-12px] top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-[2px_2px_0_#000] z-30 touch-none"
            style={{ pointerEvents: gameSolved ? "none" : "auto" }}
          ></div>
        </div>
      </div>

      <div className="text-center max-w-[180px] font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-wider hidden md:block">
        Conecte o circuito de descarte com segurança!
      </div>

      {/* COLUNA DA DIREITA: DESTINOS (LIXEIRAS) */}
      <div className="flex flex-col gap-16 z-20 h-full justify-center">
        <div
          ref={targetMetalRef}
          className="w-44 p-4 bg-amber-500 text-black border-4 border-black font-black text-xs text-center rounded-md shadow-[4px_4px_0_#000] relative"
        >
          <div
            ref={jackMetalRef}
            className="w-4 h-4 bg-black border-2 border-amber-600 rounded-full absolute left-[-8px] top-1/2 -translate-y-1/2"
          ></div>
          ♻️ LIXEIRA DE METAL
        </div>

        <div
          ref={targetReversaRef}
          className="w-44 p-4 bg-purple-600 text-white border-4 border-black font-black text-xs text-center rounded-md shadow-[4px_4px_0_#000] relative"
        >
          <div
            ref={jackReversaRef}
            className="w-4 h-4 bg-black border-2 border-purple-400 rounded-full absolute left-[-8px] top-1/2 -translate-y-1/2"
          ></div>
          ♻️ LOGÍSTICA REVERSA
        </div>
      </div>
    </div>
  );
};