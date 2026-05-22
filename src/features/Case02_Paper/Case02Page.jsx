// src/features/Case02_Paper/Case02Page.jsx
import React, { useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { ComicPanel } from "../../components/ComicPanel";
import { MemoryGrid } from "./components/MemoryGrid";
import { gsap } from "gsap";

// 🎨 Importando sua ilustração customizada do topo
import imgCaso02_01 from "../../assets/caso02_papel_img01.jpg";

export const Case02Page = () => {
  const { solveCase } = useGame();

  useEffect(() => {
    // Efeito pop-up sequencial nos diálogos da cena 2
    gsap.timeline().to("#bubble2-1", {
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.5)",
      delay: 0.3,
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-900 p-6 border-4 border-black shadow-[12px_12px_0px_#000]">
        {/* QUADRINHO NARRATIVO 1 - CORRIGIDO: w-full sem traço duplo e imagem 100% fluida */}
        <div className="md:col-span-2 relative min-h-[240px] border-4 border-black overflow-hidden bg-black shadow-[4px_4px_0_#000]">
          <img
            src={imgCaso02_01}
            alt="Detectives Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="relative z-10 p-6 h-full flex flex-col justify-between items-start">
            <div
              id="bubble2-1"
              className="bg-white text-black p-4 rounded-xl border-4 border-black font-bold max-w-xl mb-6 shadow-[4px_4px_0_#000] scale-0 origin-bottom-left text-xs md:text-base"
            >
              “Área do escritório... Que bagunça! Esta pode ser considerada nossa segunda prova de crime ambiental. Encontramos rejeitos e recicláveis misturados lado a lado. Há lenços sujos junto com papel picado limpo. Caixas de pizza engorduradas e copos de café sujos estão misturados com caixas de papelão recicláveis. Precisaremos de uma boa memória para reorganizar esses descartes!”
              <div className="absolute bottom-[-16px] left-6 w-0 h-0 border-x-[12px] border-x-transparent border-t-[16px] border-t-black"></div>
              <div className="absolute bottom-[-10px] right-[50px] w-0 h-0 border-x-[10px] border-x-transparent border-t-[12px] border-t-white"></div>
            </div>

            <h2
              className="text-3xl font-black uppercase tracking-wider text-yellow-400 drop-shadow-[2px_2px_0_#000]"
              style={{ fontFamily: "Impact" }}
            >
              CASO #02 — O MISTÉRIO DAS CARTAS
            </h2>
          </div>
        </div>

        {/* ARENA DO JOGO DA MEMÓRIA */}
        <div className="md:col-span-2 flex justify-center items-center py-4">
          <MemoryGrid
            onSuccess={() => {
              solveCase("case2");
              alert(
                "🏆 EXCELENTE DETETIVE!\nVocê arquivou a papelada corretamente e aprendeu que papéis contaminados comprometem o processo de reciclagem!",
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
