// src/features/Case03_Metal/components/WireGame.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

// 🎨 Importando o background customizado com as fitas de cena de crime
import bgPilhas from "../../../assets/caso03_pilhas_bg.png";

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

  const updateWire = () => {
    if (!arenaRef.current || !originRef.current || !dragPlugRef.current || !wirePathRef.current) return;

    const arenaRect = arenaRef.current.getBoundingClientRect();
    const originRect = originRef.current.getBoundingClientRect();
    const plugRect = dragPlugRef.current.getBoundingClientRect();

    const startX = originRect.right - arenaRect.left - 10;
    const startY = originRect.top + originRect.height / 2 - arenaRect.top;

    const currentX = plugRect.left + plugRect.width / 2 - arenaRect.left;
    const currentY = plugRect.top + plugRect.height / 2 - arenaRect.top;

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
        if (this.hitTest(targetReversa, "30%")) {
          setGameSolved(true);
          this.disable();

          const jackRect = jackReversa.getBoundingClientRect();
          const plugRect = dragPlug.getBoundingClientRect();

          const targetX = (jackRect.left + jackRect.width / 2) - (plugRect.left - this.x + plugRect.width / 2);
          const targetY = (jackRect.top + jackRect.height / 2) - (plugRect.top - this.y + plugRect.height / 2);

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
        else if (this.hitTest(targetMetal, "30%")) {
          alert("⚠️ CURTO-CIRCUITO AMBIENTAL!\nPilhas e baterias contêm metais pesados altamente tóxicos. Elas JAMAIS podem se misturar com o metal comum! Isole a área levando-as para a fita de Logística Reversa.");
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
      className="w-full min-h-[420px] border-4 border-black rounded-lg p-8 flex justify-between items-center relative overflow-hidden select-none shadow-[8px_8px_0_#000]"
      style={{
        backgroundImage: `url(${bgPilhas})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* RENDER DA FITA DE ISOLAMENTO (Aumentada a espessura para 14 e cor amarela vibrante) */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <path
          ref={wirePathRef}
          stroke="#facc15"
          strokeWidth="14"
          strokeLinecap="square"
          fill="none"
          strokeDasharray="20,10" /* Cria o efeito listrado de fita zebrada/policial */
        />
      </svg>

      {/* COLUNA DA ESQUERDA: TEXTOS SOBRE A IMAGEM */}
      <div className="flex flex-col gap-16 z-20">
        <div className="w-44 p-2 text-neutral-300 font-mono font-black text-[11px] uppercase tracking-wide bg-black/70 border border-neutral-700 rounded-sm shadow-md">
          <span className="text-yellow-400 block mb-0.5">⚠️ ÁREA:</span> DESCARTE DE METAIS
        </div>

        <div
          ref={originRef}
          className="w-44 p-2 text-neutral-200 font-mono font-black text-[11px] uppercase tracking-wide bg-black/80 border-2 border-yellow-500 rounded-sm shadow-lg relative"
        >
          <span className="text-amber-500 block mb-0.5">🔋 ORIGEM:</span> PILHAS E BATERIAS
          <div
            ref={dragPlugRef}
            className="w-7 h-7 bg-yellow-400 border-4 border-black rounded-full absolute right-[-14px] top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-[2px_2px_0_#000] z-30 touch-none flex items-center justify-center font-black text-black text-xs"
            style={{ pointerEvents: gameSolved ? "none" : "auto" }}
          >
            🚧
          </div>
        </div>
      </div>

      <div className="text-center max-w-[160px] font-mono text-[10px] text-yellow-400 font-black bg-black/80 border border-black p-2 rounded-sm uppercase tracking-wider hidden lg:block z-20 shadow-md">
        📢 Use a fita para isolar a contaminação química!
      </div>

      {/* COLUNA DA DIREITA: DESTINOS (ALVOS INVISÍVEIS FLUTUANDO SOBRE A ARTE) */}
      <div className="flex flex-col gap-20 z-20 h-full justify-center">
        {/* Metal Comum */}
        <div
          ref={targetMetalRef}
          className="w-48 p-2 bg-black/40 hover:bg-black/60 border-2 border-transparent hover:border-amber-500 text-transparent hover:text-amber-400 font-mono font-black text-[11px] text-center rounded-sm transition-colors relative cursor-crosshair h-14 flex items-center justify-center"
        >
          <div ref={jackMetalRef} className="w-3 h-3 bg-yellow-500 border border-black rounded-full absolute left-[-6px] top-1/2 -translate-y-1/2 opacity-80" />
          [ ALVO: LIXEIRA METAL ]
        </div>

        {/* Logística Reversa */}
        <div
          ref={targetReversaRef}
          className="w-48 p-2 bg-black/40 hover:bg-black/60 border-2 border-transparent hover:border-orange-500 text-transparent hover:text-orange-400 font-mono font-black text-[11px] text-center rounded-sm transition-colors relative cursor-crosshair h-14 flex items-center justify-center"
        >
          <div ref={jackReversaRef} className="w-3 h-3 bg-orange-500 border border-black rounded-full absolute left-[-6px] top-1/2 -translate-y-1/2 opacity-80" />
          [ ALVO: LOGÍSTICA REVERSA ]
        </div>
      </div>
    </div>
  );
};