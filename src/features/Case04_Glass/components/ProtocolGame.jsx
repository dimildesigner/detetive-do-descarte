// src/features/Case04_Glass/components/ProtocolGame.jsx
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

// 🎨 Importando as 3 ilustrações magníficas das etapas do protocolo
import imgPasso1 from "../../../assets/caso04_protocolo_vidros_img1.png";
import imgPasso2 from "../../../assets/caso04_protocolo_vidros_img2.png";
import imgPasso3 from "../../../assets/caso04_protocolo_vidros_img3.png";

// Matriz de dados sem a numeração explícita no texto para forçar a leitura
const INITIAL_STEPS = [
  { id: 'embrulhar', text: 'Embrulhar em papelão ou jornal', img: imgPasso1, order: 1 },
  { id: 'identificar', text: 'Escrever “Cuidado: Vidro”', img: imgPasso2, order: 2 },
  { id: 'descartar', text: 'Depositar na lixeira verde', img: imgPasso3, order: 3 }
];

export const ProtocolGame = ({ onSuccess }) => {
  const [steps, setSteps] = useState([]); // 🔀 Estado que vai guardar os quadros embaralhados
  const [currentOrder, setCurrentOrder] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Inicializa e embaralha a ordem dos quadros na parede da oficina
  useEffect(() => {
    const shuffled = [...INITIAL_STEPS].sort(() => Math.random() - 0.5);
    setSteps(shuffled);
  }, []);

  const handleStepClick = (step) => {
    if (completedSteps.includes(step.id)) return;

    if (step.order === currentOrder) {
      // ACERTOU A SEQUÊNCIA DO PROTOCOLO
      setCompletedSteps([...completedSteps, step.id]);
      setCurrentOrder(currentOrder + 1);

      // Animação de clique bem-sucedido no quadro
      gsap.fromTo(`#step-${step.id}`, 
        { scale: 1 }, 
        { scale: 1.02, duration: 0.15, yoyo: true, repeat: 1 }
      );

      if (step.order === 3) {
        setTimeout(onSuccess, 800);
      }
    } else {
      // ERROU O PROTOCOLO DE SEGURANÇA: Tremedeira e Reset
      alert("🚨 PROTOCOLO VIOLADO!\nDescartar vidro quebrado sem proteção coloca a vida dos coletores em risco. Siga as normas de segurança na ordem correta!");
      
      gsap.timeline()
        .to("#protocol-arena", { x: -10, duration: 0.05, yoyo: true, repeat: 5 })
        .to("#protocol-arena", { x: 0, duration: 0.05, onComplete: () => {
          // Mantém o desafio dinâmico: re-embaralha as cartas ao errar!
          const reshuffled = [...INITIAL_STEPS].sort(() => Math.random() - 0.5);
          setSteps(reshuffled);
          setCurrentOrder(1);
          setCompletedSteps([]);
        }});
    }
  };

  return (
    <div 
      id="protocol-arena"
      className="w-full max-w-4xl bg-neutral-950 border-4 border-black p-6 rounded-md shadow-[8px_8px_0_#000] flex flex-col items-center"
    >
      <div className="text-center mb-8">
        <h3 className="text-lg font-mono font-black text-yellow-400 uppercase tracking-wider">
          Protocolo de Acidente com Vidro
        </h3>
        <p className="text-xs text-neutral-500 font-mono uppercase tracking-tight mt-1">
          Clique nos quadros na ordem correta das diretrizes de segurança para concluir o descarte consciente!:
        </p>
      </div>

      {/* PAREDE DE QUADROS DA OFICINA (Renderizando a ordem randômica do estado 'steps') */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full px-2 mb-8">
        {steps.map((step) => {
          const isDone = completedSteps.includes(step.id);
          return (
            <div
              key={step.id}
              id={`step-${step.id}`}
              onClick={() => handleStepClick(step)}
              className={`
                relative bg-neutral-900 border-4 border-black rounded-sm overflow-hidden flex flex-col transition-all duration-300 select-none cursor-pointer
                ${isDone 
                  ? 'border-emerald-500 shadow-none scale-95 opacity-50 bg-emerald-950/20' 
                  : 'hover:border-neutral-500 shadow-[0_15px_20px_rgba(0,0,0,0.8)] hover:-translate-y-1'
                }
              `}
            >
              {/* Moldura de Imagem do Quadro */}
              <div className="w-full h-full bg-black overflow-hidden relative">
                <img 
                  src={step.img} 
                  alt={step.text} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {/* Selo Verde de Concluído por cima da arte */}
                {isDone && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center font-black text-4xl text-emerald-400 drop-shadow-[2px_2px_0_#000]">
                    ✅
                  </div>
                )}
              </div>

              {/* Descrição Inferior do Quadro (Sem números!) */}
              <div className="p-3 bg-neutral-900 border-t-2 border-black flex-1 flex items-center justify-center text-center">
                <span className={`font-mono text-[11px] font-black uppercase tracking-tight ${isDone ? 'text-emerald-400' : 'text-neutral-300'}`}>
                  {step.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* BARRA DE PROGRESSO DE MEDIDAS */}
      <div className="w-full max-w-xl bg-black h-4 border-2 border-black rounded-full overflow-hidden p-0.5">
        <div 
          className="bg-emerald-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${(completedSteps.length / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};