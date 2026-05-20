// src/features/Case01_Plastic/Case01Page.jsx
import React, { useEffect, useRef, useState } from "react";
import { useGame } from "../../context/GameContext";
import { ComicPanel } from "../../components/ComicPanel";
import { gsap } from "gsap";
import { DragDropGame } from "./components/DragDropGame";

// 🎨 Importando suas novas ilustrações customizadas
import img01 from "../../assets/caso01_pet_img01.jpg"; // O banner dos detetives
import img02 from "../../assets/caso01_pet_img02.jpg"; // O detetive andando (corpo)
import img03 from "../../assets/caso01_pet_img03.jpg"; // A cena da garrafa no lixo

export const Case01Page = () => {
  const { solveCase } = useGame();
  const canvasRef = useRef(null);
  const panelRef = useRef(null);
  const [evidenceVisible, setEvidenceVisible] = useState(false);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to("#bubble1-1", { scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.5 })
      .to("#bubble1-2", { scale: 1, duration: 0.5, ease: "back.out(1.5)" }, "+=0.5");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const panel = panelRef.current;

    const resizeCanvas = () => {
      if (!panel) return;
      canvas.width = panel.clientWidth;
      canvas.height = panel.clientHeight;
      drawDarkness(0, 0, 0);
    };

    const drawDarkness = (x, y, radius) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10, 10, 10, 0.98)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      drawDarkness(mX, mY, 85); // Aumentei um pouco o feixe para sua arte brilhar mais

      // Localização da garrafa na imagem03 (centralizada no container)
      const evX = rect.width / 2;
      const evY = rect.height / 2;
      const distance = Math.hypot(mX - evX, mY - evY);
      setEvidenceVisible(distance < 85);
    };

    resizeCanvas();
    panel.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      panel?.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [showGame]);

  const handleEvidenceClick = () => {
    gsap.to("#crunch-vfx", {
      scale: 1.5,
      duration: 0.4,
      ease: "elastic.out(1, 0.3)",
      onComplete: () => {
        setTimeout(() => {
          gsap.to("#crunch-vfx", { scale: 0, duration: 0.2 });
          setShowGame(true);
        }, 800);
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24 animate-page-turn">
      <div id="crunch-vfx" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 font-black text-6xl text-yellow-400 z-50 pointer-events-none drop-shadow-[4px_4px_0_#000]" style={{ fontFamily: "Impact" }}>
        Tcharam!
        {/* CRUNCH! */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-900 p-6 border-4 border-black shadow-[12px_12px_0px_#000]">
        
        {/* QUADRINHO 1: IMAGEM 01 (BANNER TOPO) */}
        <div className="md:col-span-2 relative min-h-[220px] border-4 border-black overflow-hidden bg-black">
          <img src={img01} alt="Detectives Banner" className="absolute inset-0 w-full h-full object-cover opacity-70" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div id="bubble1-1" className="relative bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xl shadow-[4px_4px_0_#000] scale-0 origin-bottom-left text-xs md:text-base">
               "Alguém descartou uma garrafa PET no lixo orgânico. Poxa... O plástico pode levar 450 anos para sumir... Então, precisamos agir."
               <div className="absolute bottom-[-16px] left-6 w-0 h-0 border-x-[12px] border-x-transparent border-t-[16px] border-t-black"></div>
               <div className="absolute bottom-[-10px] right-[50px] w-0 h-0 border-x-[10px] border-x-transparent border-t-[12px] border-t-white"></div>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-wider text-yellow-400 drop-shadow-[3px_3px_3px_#000]" style={{ fontFamily: "Impact" }}>
              Caso #01: A Garrafa Fantasma
            </h2>
          </div>
        </div>

        {/* QUADRINHO 2: IMAGEM 02 (DETETIVE LADO ESQUERDO) */}
        <div className="relative min-h-[350px] border-4 border-black overflow-hidden bg-neutral-950">
          <img src={img02} alt="Detective Walking" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-end">
             <div id="bubble1-2" className="bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xs mb-4 shadow-[4px_4px_0_#000] scale-0 origin-bottom-left text-base">
                "Vamos inspecionar a lixeira de recicláveis orgânicos. Estou sentindo cheiro de negligência no ar..."
              <div className="absolute top-[-10px] left-[70px] w-0 h-0 border-x-[10px] border-x-transparent border-b-[12px] border-b-white"></div>
             </div>
             <p className="font-mono text-xs text-yellow-400 font-bold bg-black/60 p-1 rounded inline-block w-fit">
                🐾 ACESSANDO STATUS: Investigação em campo...
             </p>
          </div>
        </div>

        {/* QUADRINHO 3: IMAGEM 03 (LANTERNA / LIXO LADO DIREITO) */}
        <div
          ref={panelRef}
          className="bg-neutral-950 border-4 border-black min-h-[350px] relative overflow-hidden flex items-center justify-center select-none shadow-[8px_8px_0px_#000]"
          style={{ cursor: showGame ? "default" : "none" }}
        >
          {/* A imagem do lixo fica POR TRÁS do canvas */}
          {!showGame && (
            <img src={img03} alt="Trash Scene" className="absolute inset-0 w-full h-full object-cover" />
          )}

          {/* Área clicável invisível que representa a garrafa na imagem */}
          <div
            onClick={handleEvidenceClick}
            className="w-30 h-30 cursor-pointer z-30 flex items-center justify-center rounded-full absolute bottom-4 left-45"
            style={{
              pointerEvents: showGame ? "none" : "auto",
              border: evidenceVisible ? "2px dashed rgba(255,255,0,0.5)" : "none" // Feedback sutil quando a lanterna está em cima
            }}
          >
            {/* Opcional: manter um brilho sutil quando a lanterna encontra a garrafa */}
            {evidenceVisible && <div className="w-full h-full bg-yellow-400/10 animate-pulse rounded-full"></div>}
          </div>

          {/* O Canvas desenha o breu estilo Noir */}
          {!showGame && (
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-20" />
          )}

          {/* Se o mini-game começar, a imagem 03 some para dar lugar à arena */}
          {showGame && (
            <div className="absolute inset-0 bg-neutral-900 z-40 p-4">
               <DragDropGame onSuccess={() => solveCase("case1")} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};