// src/features/Case03_Metal/Case03Page.jsx
import React, { useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { WireGame } from "./components/WireGame";
import { gsap } from "gsap";

// 🎨 Importando a ilustração customizada do topo (Corrigido para .jpg!)
import imgCaso03_01 from "../../assets/caso03_papel_img01_topo.png";

export const Case03Page = () => {
  const { solveCase } = useGame();

  useEffect(() => {
    gsap.to("#bubble3-1", {
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.5)",
      delay: 0.3,
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-900 p-6 border-4 border-black shadow-[12px_12px_0px_#000]">
        {/* QUADRINHO NARRATIVO - Sangrado de ponta a ponta sem margens */}
        <div className="md:col-span-3 relative min-h-[240px] border-4 border-black overflow-hidden bg-black shadow-[4px_4px_0_#000]">
          <img
            src={imgCaso03_01}
            alt="Detectives Banner"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-70"
          />
          <div className="relative z-10 p-6 h-full flex flex-col justify-between items-start">
            <div
              id="bubble3-1"
              className="bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xl mb-6 shadow-[4px_4px_0_#000] scale-0 origin-bottom-left text-xs md:text-base"
            >
              "Oficina de Manutenção... Encontramos uma verdadeira bomba-relógio ecológica. Descartaram pilhas e baterias junto com latas de alumínio recicláveis! Se esses componentes vazarem, poderão contaminar todo o lote de metal. Precisamos isolar os circuitos!”
            </div>
            <h2
              className="text-3xl font-black uppercase tracking-wider text-amber-500 drop-shadow-[2px_2px_0_#000]"
              style={{ fontFamily: "Impact" }}
            >
              CASO #03 — CURTO-CIRCUITO QUÍMICO
            </h2>
          </div>
        </div>

        {/* ARENA DO JOGO DOS FIOS */}
        <div className="md:col-span-3 py-4">
          <WireGame
            onSuccess={() => {
              solveCase("case3");
              alert(
                "⚡ ÁREA ISOLADA COM SUCESSO!\nSensacional, parceiro! O metal foi protegido da contaminação química e os resíduos perigosos foram destinados corretamente para a Logística Reversa.",
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
