// src/components/MainMenu.jsx
import React, { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";
import { gsap } from "gsap";

// 🎨 Importando as artes originais que você enviou!
import mainImg from "../assets/bg-detectives.png";
import imgGolden from "../assets/agente_golden.png";
import imgPoodle from "../assets/agente_poodle.png";
import imgLogo from "../assets/logo_detetive_descarte.svg";
import imgLogoLupa from "../assets/logo_detetive_descarte_lupa_preta.svg";
import imgLogoNegativo from "../assets/logo_detetive_descarte_negativo.svg";

export default function MainMenu({ onStart }) {
  const { setGameState } = useGame();
  const [nameInput, setNameInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🦮"); // Mantém o valor interno para não quebrar o resto do app

  useEffect(() => {
    // 🔍 Injeta dinamicamente a fonte estilo gibi vitoriano (idêntica à das plaquinhas)
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Rye&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Animação dramática de entrada
    gsap
      .timeline()
      .to("#menu-art", { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
      .to(
        "#menu-title",
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.3",
      )
      .to("#menu-form", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim())
      return alert("Por favor, digite sua identificação de Agente!");

    setGameState((prev) => ({
      ...prev,
      playerName: nameInput.toUpperCase(),
      playerAvatar: selectedAvatar,
    }));

    gsap.to("#menu-container", {
      opacity: 0,
      scale: 0.98,
      duration: 0.4,
      onComplete: onStart,
    });
  };

  return (
    <div
      id="menu-container"
      className="fixed inset-0 bg-neutral-950 z-50 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 overflow-y-auto gap-8"
      style={{
        backgroundImage: "radial-gradient(#111 2px, transparent 0px)",
        backgroundSize: "25px 25px",
      }}
    >
      {/* COLUNA 1: CAPA COM SEUS DETETIVES */}
      <div
        id="menu-art"
        className="w-full md:w-1/2 max-w-lg opacity-0 -translate-x-6 transition-all"
      >
        <img
          src={mainImg}
          alt="Detetives do Descarte"
          className="w-full h-auto border-6 border-black rounded-sm shadow-[8px_8px_0_#000] object-cover"
        />
      </div>

      {/* COLUNA 2: FORMULÁRIO DE ENTRADA */}
      <div className="w-full md:w-1/2 max-w-md flex flex-col justify-center">
        <img
          src={imgLogo}
          alt="Logotipo Detetive do Descarte"
          className="w-12 h-12 ml-[12px] text-center"
        />
        <h1
          id="menu-title"
          className="text-4xl md:text-5xl font-black tracking-tighter text-yellow-400 opacity-0 -translate-y-4 select-none drop-shadow-[3px_3px_0_#000] text-left md:text-left ml-[10px]"
          style={{ fontFamily: "Impact" }}
        >
          DETETIVE DO DESCARTE
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mt-1 text-center md:text-left mb-5">
          Operação Eco-Compliance Corporativo
        </p>

        <form
          id="menu-form"
          onSubmit={handleSubmit}
          className="bg-neutral-900 border-4 border-black p-6 rounded-md shadow-[8px_8px_0_#000] opacity-0 translate-y-4 text-left"
        >
          {/* SELEÇÃO V VISUAL DOS AVATARES AUTORAIS */}
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-3">
            Selecione seu Parceiro de Investigação:
          </label>

          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* CARD DO GOLDEN */}
            <div
              onClick={() => setSelectedAvatar("🦮")}
              className={`border-4 rounded-md overflow-hidden bg-black/50 p-2 cursor-pointer transition-all flex flex-col items-center gap-2 text-center
                ${selectedAvatar === "🦮" ? "border-yellow-400 shadow-[6px_6px_0_#ca8a04] bg-yellow-500/10" : "border-black hover:border-neutral-800"}`}
            >
              <img
                src={imgGolden}
                alt="Agente Golden"
                className="w-full h-full object-cover border-0 border-black rounded-sm"
              />
              <div
                className="text-neutral-200 text-sm tracking-wide mt-1"
                style={{ fontFamily: "'Rye', serif" }} // 👈 APLICANDO A FONTE ESTILO GIBI RETRÔ!
              >
                GOLDEN
              </div>
            </div>

            {/* CARD DA POODLE */}
            <div
              onClick={() => setSelectedAvatar("🐩")}
              className={`border-4 rounded-md overflow-hidden bg-black/50 p-2 cursor-pointer transition-all flex flex-col items-center gap-2 text-center
                ${selectedAvatar === "🐩" ? "border-purple-500 shadow-[6px_6px_0_#7c3aed] bg-purple-500/10" : "border-black hover:border-neutral-800"}`}
            >
              <img
                src={imgPoodle}
                alt="Agente Poodle"
                className="w-full h-full object-cover border-0 border-black rounded-sm"
              />
              <div
                className="text-neutral-200 text-sm tracking-wide mt-1"
                style={{ fontFamily: "'Rye', serif" }} // 👈 APLICANDO A FONTE ESTILO GIBI RETRÔ!
              >
                POODLE
              </div>
            </div>
          </div>

          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-2">
            Nome do Investigador:
          </label>
          <input
            type="text"
            maxLength={15}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Ex: AGENTE EDDIE"
            className="w-full bg-black border-4 border-black p-3 font-mono text-xs text-yellow-400 focus:outline-none focus:border-yellow-400 placeholder-neutral-800 rounded-sm font-bold uppercase transition-colors"
          />

          <button
            type="submit"
            className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-wider border-4 border-black py-3 rounded-md shadow-[4px_4px_0_#000] hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] transition-all cursor-pointer text-xs grid grid-cols-[auto_1fr_auto] items-center px-4"
          >
            {/* Div da imagem alinhada à esquerda */}
            <div className="flex justify-start">
              <img
                src={imgLogoLupa}
                alt="Logotipo Detetive do Descarte"
                className="w-6 h-6 object-contain"
              />
            </div>

            {/* Div do texto centralizada no botão */}
            <div className="text-center">Iniciar Investigação</div>

            {/* Div invisível à direita para equilibrar o grid e manter o texto no centro perfeito */}
            <div className="w-6" aria-hidden="true"></div>
          </button>
        </form>
      </div>
    </div>
  );
}
