// src/components/MainMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import { useGame } from "../context/GameContext";
import { gsap } from "gsap";

// 🎨 Importando as artes originais do projeto
import mainImg from "../assets/bg-detectives.png";
import imgGolden from "../assets/agente_golden.png";
import imgPoodle from "../assets/agente_poodle.png";
import imgLogo from "../assets/logo_detetive_descarte.svg";
import imgLogoLupa from "../assets/logo_detetive_descarte_lupa_preta.svg";

// 🎵 Importação fictícia da trilha de mistério (substitua pelo seu arquivo mp3 real)
import trilhaIntro from "../assets/audio/trilha_intro.mp3";

export default function MainMenu({ onStart }) {
  const { setGameState } = useGame();
  const [nameInput, setNameInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🦮");
  const [isMuted, setIsMuted] = useState(true); // Inicializa mutado por boa prática de UX

  const audioRef = useRef(null);

  useEffect(() => {
    // 🔍 Injeta dinamicamente a fonte estilo gibi vitoriano para as tags de nomes
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Rye&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Animação dramática e refinada de entrada (GSAP)
    gsap.timeline()
      .to("#menu-art", { opacity: 1, x: 0, duration: 1, ease: "power4.out" })
      .to("#menu-content", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .to("#audio-control", { opacity: 1, scale: 1, duration: 0.4 }, "-=0.2");
  }, []);

  // Controla o Play/Pause do Áudio de Mistério
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(err => console.log("Interação necessária para tocar áudio."));
        audioRef.current.muted = false;
      } else {
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim())
      return alert("Por favor, digite sua identificação de agente!");

    setGameState((prev) => ({
      ...prev,
      playerName: nameInput.toUpperCase(),
      playerAvatar: selectedAvatar,
    }));

    gsap.to("#menu-container", {
      opacity: 0,
      scale: 0.99,
      duration: 0.5,
      onComplete: onStart,
    });
  };

  return (
    <div
      id="menu-container"
      className="fixed inset-0 bg-neutral-950 z-50 flex flex-col md:flex-row items-stretch p-4 md:p-12 overflow-y-auto gap-8 md:gap-12 select-none"
      style={{
        backgroundImage: "radial-gradient(#161616 2px, transparent 0px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Elemento de Áudio Oculto */}
      <audio ref={audioRef} src={trilhaIntro} loop muted={isMuted} />

      {/* 🔊 CONTROLADOR FLUTUANTE DE ÁUDIO (UX Primorosa) */}
      <button
        id="audio-control"
        onClick={toggleAudio}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full border-2 border-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer scale-0 opacity-0
          ${isMuted 
            ? "bg-neutral-800 text-neutral-400 shadow-[4px_4px_0_#000]" 
            : "bg-yellow-400 text-black shadow-[4px_4px_0_#000] animate-pulse"
          }`}
      >
        {isMuted ? "🔇 Som: Desativado" : "🔊 Som: Suspense Ativado"}
      </button>

      {/* COLUNA 1: A ESTRELA DO LAYOUT (2/3 da tela para valorizar a cena de investigação) */}
      <div
        id="menu-art"
        className="w-full md:w-8/12 flex items-center justify-center opacity-0 -translate-x-8 transition-all"
      >
        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center border-4 md:border-8 border-black rounded-sm shadow-[16px_16px_0px_#000] overflow-hidden bg-neutral-900 group">
          <img
            src={mainImg}
            alt="Investigadores analisando o descarte"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          {/* Vinheta escura estilo quadrinho para dar profundidade dramática */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30 pointer-events-none"></div>
        </div>
      </div>

      {/* COLUNA 2: IDENTIDADE E FORMULÁRIO (1/3 da tela - compacto e direto ao ponto) */}
      <div 
        id="menu-content"
        className="w-full md:w-4/12 flex flex-col justify-between opacity-0 translate-y-4 transition-all py-2"
      >
        {/* Bloco do Título e Logo */}
        <div className="flex flex-col items-start mt-4 md:mt-0">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={imgLogo}
              alt="Logotipo Principal"
              className="w-8 h-8 object-contain"
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">
              Operação Eco-Compliance
            </p>
          </div>
          
          {/* 🎯 Título corrigido: tracking-wide espaça as letras e eleva a leitura do Impact! */}
          <h1
            className="text-4xl md:text-5xl font-black tracking-widest text-yellow-400 drop-shadow-[4px_4px_0_#000] uppercase leading-none"
            style={{ fontFamily: "Impact, sans-serif" }}
          >
            Detetive<br />do Descarte
          </h1>
        </div>

        {/* Formulário de Credenciamento */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 border-4 border-black p-5 md:p-6 rounded-sm shadow-[8px_8px_0_#000] my-6 flex flex-col justify-center"
        >
          {/* Seleção Compactada dos Mascotes */}
          <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-3">
            Selecione seu parceiro de campo:
          </label>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* CARD GOLDEN */}
            <div
              onClick={() => setSelectedAvatar("🦮")}
              className={`border-4 rounded-sm overflow-hidden bg-neutral-950 p-1.5 cursor-pointer transition-all flex flex-col items-center gap-1.5 text-center
                ${selectedAvatar === "🦮" ? "border-yellow-400 shadow-[4px_4px_0_#ca8a04] bg-yellow-500/5 scale-[1.02]" : "border-black opacity-60 hover:opacity-100"}`}
            >
              <div className="w-24 h-24 overflow-hidden rounded-sm">
                <img src={imgGolden} alt="Agente Golden" className="w-full h-full object-cover" />
              </div>
              <div className="text-neutral-200 text-xs tracking-wider" style={{ fontFamily: "'Rye', serif" }}>
                GOLDEN
              </div>
            </div>

            {/* CARD POODLE */}
            <div
              onClick={() => setSelectedAvatar("🐩")}
              className={`border-4 rounded-sm overflow-hidden bg-neutral-950 p-1.5 cursor-pointer transition-all flex flex-col items-center gap-1.5 text-center
                ${selectedAvatar === "🐩" ? "border-purple-500 shadow-[4px_4px_0_#7c3aed] bg-purple-500/5 scale-[1.02]" : "border-black opacity-60 hover:opacity-100"}`}
            >
              <div className="w-24 h-24 overflow-hidden rounded-sm">
                <img src={imgPoodle} alt="Agente Poodle" className="w-full h-full object-cover" />
              </div>
              <div className="text-neutral-200 text-xs tracking-wider" style={{ fontFamily: "'Rye', serif" }}>
                POODLE
              </div>
            </div>
          </div>

          {/* Nome do Jogador */}
          <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-1.5">
            Identificação do Investigador:
          </label>
          <input
            type="text"
            maxLength={15}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="EX: AGENTE EDDIE"
            className="w-full bg-black border-4 border-black p-2.5 font-mono text-xs text-yellow-400 focus:outline-none focus:border-yellow-400 placeholder-neutral-800 rounded-sm font-black uppercase tracking-wider transition-colors"
          />

          {/* Botão de Ignição */}
          <button
            type="submit"
            className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-wider border-4 border-black py-3 rounded-sm shadow-[4px_4px_0_#000] hover:translate-y-0.5 hover:shadow-[2px_2px_0_#000] transition-all cursor-pointer text-xs grid grid-cols-[auto_1fr_auto] items-center px-3"
          >
            <div className="flex justify-start">
              <img src={imgLogoLupa} alt="Lupa" className="w-5 h-5 object-contain" />
            </div>
            <div className="text-center font-mono font-bold tracking-tight">Iniciar Investigação</div>
            <div className="w-5" aria-hidden="true"></div>
          </button>
        </form>

        {/* ✒️ CRÉDITOS E DIREITOS AUTORAIS (Assinatura Premium no Rodapé) */}
        <div className="text-center md:text-left mt-auto pt-4 border-t border-neutral-900">
          <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-600">
            © {new Date().getFullYear()} Detetive do Descarte • Todos os direitos reservados.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mt-0.5">
            Designed & Developed by{" "}
            <a
              href="https://dimildesigner-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-yellow-400 font-bold underline transition-colors decoration-dotted"
            >
              dimildesigner
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}