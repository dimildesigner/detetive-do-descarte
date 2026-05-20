// src/features/Case02_Paper/components/MemoryGrid.jsx
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

// 🎨 Importando os cards ilustrados que você enviou!
import imgPapelLimpo from "../../../assets/caso02-cards_papel_reciclado.png";
import imgCopoSujo from "../../../assets/caso02-cards_copo_cafe_nao_reciclado.png";
import imgPapelao from "../../../assets/caso02-cards_papelao_reciclado.png";
import imgLencoUmido from "../../../assets/caso02-cards_lenco_humidecido_nao_reciclado.png";

const INITIAL_CARDS = [
  { id: 1, name: "Papel Limpo", img: imgPapelLimpo, type: "reciclável" },
  { id: 1, name: "Papel Limpo", img: imgPapelLimpo, type: "reciclável" },
  { id: 2, name: "Copo de café", img: imgCopoSujo, type: "rejeito" },
  { id: 2, name: "Copo de café", img: imgCopoSujo, type: "rejeito" },
  { id: 3, name: "Caixa de papelão", img: imgPapelao, type: "reciclável" },
  { id: 3, name: "Caixa de papelão", img: imgPapelao, type: "reciclável" },
  { id: 4, name: "Papel toalha", img: imgLencoUmido, type: "rejeito" },
  { id: 4, name: "Papel toalha", img: imgLencoUmido, type: "rejeito" },
];

export const MemoryGrid = ({ onSuccess }) => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matches, setMatches] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);

  useEffect(() => {
    const shuffled = [...INITIAL_CARDS].sort(() => Math.random() - 0.5);
    setCards(shuffled.map((card, i) => ({ ...card, uniqueId: i })));
  }, []);

  const handleCardClick = (card, index) => {
    if (
      lockBoard ||
      matches.includes(card.id) ||
      selected.some((s) => s.uniqueId === index)
    )
      return;

    gsap.to(`#card-${index}`, {
      rotateY: 180,
      duration: 0.4,
      ease: "power2.out",
    });

    const newSelected = [...selected, { ...card, uniqueId: index }];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setLockBoard(true);
      checkMatch(newSelected);
    }
  };

  const checkMatch = (currentSelected) => {
    const [first, second] = currentSelected;

    if (first.id === second.id) {
      setTimeout(() => {
        gsap.to([`#card-${first.uniqueId}`, `#card-${second.uniqueId}`], {
          scale: 1.05,
          yoyo: true,
          repeat: 1,
          duration: 0.2,
        });

        setMatches([...matches, first.id]);
        setSelected([]);
        setLockBoard(false);

        if (first.type === "reciclável") {
          alert(`Excelente! ${first.name} vai para a Lixeira Azul.`);
        } else {
          alert(
            `Muito bom! ${first.name} está contaminado e vai para o Rejeito comum.`,
          );
        }

        if (matches.length + 1 === INITIAL_CARDS.length / 2) {
          onSuccess();
        }
      }, 600);
    } else {
      setTimeout(() => {
        gsap
          .timeline()
          .to([`#card-${first.uniqueId}`, `#card-${second.uniqueId}`], {
            x: -6,
            yoyo: true,
            repeat: 3,
            duration: 0.05,
          })
          .to([`#card-${first.uniqueId}`, `#card-${second.uniqueId}`], {
            x: 0,
            duration: 0.05,
          })
          .to([`#card-${first.uniqueId}`, `#card-${second.uniqueId}`], {
            rotateY: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              setSelected([]);
              setLockBoard(false);
            },
          });
      }, 800);
    }
  };

  return (
    <div
      className="w-full max-w-2xl bg-neutral-950 border-4 border-black p-6 rounded-md flex flex-col items-center shadow-[8px_8px_0_#000]"
      style={{ perspective: "1000px" }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
        {cards.map((card, index) => {
          const isMatched = matches.includes(card.id);
          return (
            <div
              key={index}
              id={`card-${index}`}
              onClick={() => handleCardClick(card, index)}
              className="h-44 relative cursor-pointer select-none"
              style={{
                transformStyle: "preserve-3d",
                opacity: isMatched ? 0.4 : 1,
                transition: "opacity 0.3s",
              }}
            >
              {/* VERSO DA CARTA (Fundo Preto com Símbolo de Reciclagem) */}
              <div
                className="absolute w-full h-full bg-neutral-900 border-4 border-black rounded-sm flex items-center justify-center text-3xl text-yellow-400 shadow-[3px_3px_0_#000]"
                style={{ backfaceVisibility: "hidden" }}
              >
                ♻️
              </div>

              {/* FRENTE DA CARTA (Exibe sua arte customizada) */}
              <div
                className="absolute w-full h-full bg-neutral-800 text-white border-4 border-black rounded-sm overflow-hidden shadow-[3px_3px_0_#000]"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {/* Imagem de fundo ocupando 100% do espaço */}
                <img
                  src={card.img}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />

                {/* Container do texto sobreposto no rodapé (absolute) com fundo semi-transparente */}
                <div className="absolute top-3 left-3 right-3 p-1.5 flex flex-col justify-between bg-neutral-900/60">
                  <span className="text-[10px] font-black uppercase tracking-tight leading-none text-neutral-200 truncate">
                    {card.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)' ${card.type === "reciclável" ? "text-[#54ec77]" : "text-[#ff3c61]"}`}
                  >
                    {card.type === "reciclável" ? "Reciclável" : "Rejeito"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
