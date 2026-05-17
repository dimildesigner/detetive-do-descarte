// src/features/Case02_Paper/components/MemoryGrid.jsx
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const INITIAL_CARDS = [
  { id: 1, name: 'Papel Limpo', icon: '📄', type: 'reciclável' },
  { id: 1, name: 'Papel Limpo', icon: '📄', type: 'reciclável' },
  { id: 2, name: 'Copo de Café Sujo', icon: '☕', type: 'rejeito' },
  { id: 2, name: 'Copo de Café Sujo', icon: '☕', type: 'rejeito' },
  { id: 3, name: 'Caixa de Papelão', icon: '📦', type: 'reciclável' },
  { id: 3, name: 'Caixa de Papelão', icon: '📦', type: 'reciclável' },
  { id: 4, name: 'Papel Toalha Úmido', icon: '🧻', type: 'rejeito' },
  { id: 4, name: 'Papel Toalha Úmido', icon: '🧻', type: 'rejeito' }
];

export const MemoryGrid = ({ onSuccess }) => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matches, setMatches] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);

  // Inicializa e embaralha as cartas ao montar o componente
  useEffect(() => {
    const shuffled = [...INITIAL_CARDS].sort(() => Math.random() - 0.5);
    setCards(shuffled.map((card, i) => ({ ...card, uniqueId: i })));
  }, []);

  const handleCardClick = (card, index) => {
    if (lockBoard || matches.includes(card.id) || selected.some(s => s.uniqueId === index)) return;

    // Animação GSAP girando a carta selecionada no eixo Y (Efeito 3D)
    gsap.to(`#card-${index}`, { rotateY: 180, duration: 0.4, ease: 'power2.out' });

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
      // Deu Match!
      setTimeout(() => {
        // Efeito visual de pulo nas cartas corretas
        gsap.to([`#card-${first.uniqueId}`, `#card-${second.uniqueId}`], {
          scale: 1.05, yoyo: true, repeat: 1, duration: 0.2
        });

        setMatches([...matches, first.id]);
        setSelected([]);
        setLockBoard(false);

        // Feedback pedagógico rápido via console/alerta sutil
        if (first.type === 'reciclável') {
          alert(`Excelente! ${first.name} vai para a Lixeira Azul.`);
        } else {
          alert(`Muito bom! ${first.name} está contaminado e vai para o Rejeito comum.`);
        }

        // Verifica se limpou todo o tabuleiro (4 pares)
        if (matches.length + 1 === INITIAL_CARDS.length / 2) {
          onSuccess();
        }
      }, 600);
    } else {
      // Errou o par: treme as cartas e desvira
      setTimeout(() => {
        gsap.timeline()
          .to([`#card-${first.uniqueId}`, `#card-${second.uniqueId}`], { x: -6, yoyo: true, repeat: 3, duration: 0.05 })
          .to([`#card-${first.uniqueId}`, `#card-${second.uniqueId}`], { x: 0, duration: 0.05 })
          .to([`#card-${first.uniqueId}`, `#card-${second.uniqueId}`], { 
            rotateY: 0, 
            duration: 0.4, 
            ease: 'power2.out',
            onComplete: () => {
              setSelected([]);
              setLockBoard(false);
            }
          });
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-xl bg-neutral-900 border-4 border-black p-6 rounded-lg flex flex-col items-center shadow-[8px_8px_0_#000]" style={{ perspective: '1000px' }}>
      <div className="grid grid-cols-4 gap-4 w-full">
        {cards.map((card, index) => {
          const isFlipped = selected.some(s => s.uniqueId === index) || matches.includes(card.id);
          return (
            <div
              key={index}
              id={`card-${index}`}
              onClick={() => handleCardClick(card, index)}
              className="h-36 relative cursor-pointer select-none transition-opacity duration-300"
              style={{ transformStyle: 'preserve-3d', opacity: matches.includes(card.id) ? 0.4 : 1 }}
            >
              {/* VERSO DA CARTA (Olhando de frente) */}
              <div className="absolute w-full h-full bg-neutral-800 border-4 border-black rounded-md flex items-center justify-center font-bold text-2xl text-yellow-400 shadow-[2px_2px_0_#000]" style={{ backfaceVisibility: 'hidden' }}>
                ♻️
              </div>
              
              {/* FRENTE DA CARTA (Revelada no giro 3D) */}
              <div className="absolute w-full h-full bg-white text-black border-4 border-black rounded-md flex flex-col items-center justify-center p-2 text-center shadow-[2px_2px_0_#000]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <span className="text-3xl mb-1">{card.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-tight leading-none mb-1">{card.name}</span>
                <span className={`text-[8px] font-bold ${card.type === 'reciclável' ? 'text-blue-600' : 'text-red-500'}`}>
                  {card.type === 'reciclável' ? 'Reciclável' : 'Rejeito'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};