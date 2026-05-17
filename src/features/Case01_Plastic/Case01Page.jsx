// src/features/Case01_Plastic/Case01Page.jsx
import React, { useEffect, useRef, useState } from "react";
import { useGame } from "../../context/GameContext";
import { ComicPanel } from "../../components/ComicPanel";
import { gsap } from "gsap";
import { DragDropGame } from "./components/DragDropGame";

export const Case01Page = () => {
  const { gameState, solveCase } = useGame();
  const canvasRef = useRef(null);
  const panelRef = useRef(null);
  const [evidenceVisible, setEvidenceVisible] = useState(false);
  const [showGame, setShowGame] = useState(false);

  // Balões de fala controlados sequencialmente via GSAP
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to("#bubble1-1", {
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.5)",
      delay: 0.5,
    }).to(
      "#bubble1-2",
      { scale: 1, duration: 0.5, ease: "back.out(1.5)" },
      "+=0.5",
    );
  }, []);

  // Lógica do Canvas para a Lanterna Noir
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const panel = panelRef.current;

    const resizeCanvas = () => {
      canvas.width = panel.clientWidth;
      canvas.height = panel.clientHeight;
      drawDarkness(0, 0, 0);
    };

    const drawDarkness = (x, y, radius) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(12, 12, 12, 0.98)"; // Breu escuro estilo Noir
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Corta o círculo da lanterna
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const handleMouseMove = (e) => {
      const rect = panel.getBoundingClientRect();
      const mX = e.clientX - rect.left;
      const mY = e.clientY - rect.top;

      drawDarkness(mX, mY, 75); // Raio do feixe de luz

      // Lógica de detecção de proximidade do objeto oculto
      const evX = rect.width / 2;
      const evY = rect.height / 2;
      const distance = Math.hypot(mX - evX, mY - evY);

      if (distance < 75) {
        setEvidenceVisible(true);
      } else {
        setEvidenceVisible(false);
      }
    };

    resizeCanvas();
    panel.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      panel.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleEvidenceClick = () => {
    gsap.to("#crunch-vfx", {
      scale: 1.5,
      duration: 0.4,
      ease: "elastic.out(1, 0.3)",
      onComplete: () => {
        setTimeout(() => {
          gsap.to("#crunch-vfx", { scale: 0, duration: 0.2 });
          setShowGame(true); // Abre a transição para a Arena do Mini-game
        }, 800);
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24 animate-page-turn">
      {/* ONOMATOPEIA INSTANTÂNEA */}
      <div
        id="crunch-vfx"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 font-black text-6xl text-yellow-400 z-50 pointer-events-none drop-shadow-[4px_4px_0_#000]"
        style={{ fontFamily: "Impact" }}
      >
        CRUNCH!
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-900 p-6 border-4 border-black shadow-[12px_12px_0px_#000]">
        {/* QUADRINHO 1: INTRODUÇÃO */}
        <ComicPanel className="md:col-span-3 min-h-[180px] bg-neutral-950">
          {/* Balão com formato de gibi */}
          <div
            id="bubble1"
            className="relative bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xl mb-6 shadow-[4px_4px_0_#000] scale-0 origin-bottom-left text-sm"
          >
            "18:00h. Mais um turno terminando... Na cozinha do escritório, o
            lixo transborda. Alguém descartou uma garrafa pet com refrigerante
            no lixo orgânico. O plástico vai levar 450 anos para sumir, e a
            umidade do orgânico estraga a reciclagem. Preciso agir."
            {/* Rabicho do balão */}
            <div className="absolute bottom-[-16px] left-6 w-0 h-0 border-x-[12px] border-x-transparent border-t-[16px] border-t-black"></div>
            <div className="absolute bottom-[-10px] left-[26px] w-0 h-0 border-x-[10px] border-x-transparent border-t-[12px] border-t-white"></div>
          </div>
          <h2
            className="text-3xl font-black uppercase tracking-wider text-yellow-400"
            style={{ fontFamily: "Impact" }}
          >
            Caso #01: A Garrafa Fantasma
          </h2>
        </ComicPanel>

        {/* QUADRINHO 2: O DETETIVE */}
        <ComicPanel className="flex flex-col justify-end min-h-[300px]">
          <div
            id="bubble1-2"
            className="bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xs mb-4 shadow-[4px_4px_0_#000] scale-0 origin-bottom-left"
          >
            "Vou inspecionar a lixeira de recicláveis orgânicos. Sinto cheiro de
            negligência no ar..."
          </div>
          <p className="font-mono text-sm text-yellow-400 font-bold">
            🐾 Status: Investigando campo...
          </p>
        </ComicPanel>

        {/* QUADRINHO 3: A LANTERNA (CANVAS INTERATIVO) */}
        <div
          ref={panelRef}
          className="bg-neutral-950 border-4 border-black min-h-[300px] relative overflow-hidden flex items-center justify-center select-none shadow-[8px_8px_0px_#000]"
          style={{ cursor: showGame ? "default" : "none" }}
        >
          {/* Evidência oculta atrás do Canvas */}
          <div
            onClick={handleEvidenceClick}
            className="text-6xl cursor-pointer transition-all duration-200 select-none z-10"
            style={{
              opacity: evidenceVisible ? 1 : 0,
              pointerEvents: showGame ? "none" : "auto",
              transform: evidenceVisible ? "scale(1.2)" : "scale(1)",
            }}
          >
            🍾
          </div>

          {/* O Canvas desenha a escuridão por cima, deixando vazar apenas o feixe */}
          {!showGame && (
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
            />
          )}
        </div>

        {/* INTERFACE DO MINI-GAME MODULAR */}
        {showGame && (
          <div className="md:col-span-2 w-full">
            <DragDropGame
              onSuccess={() => {
                solveCase("case1");
                alert(
                  "💥 SENACIONAL! O plástico foi sentenciado ao lugar certo. O Dossiê foi atualizado!",
                );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
