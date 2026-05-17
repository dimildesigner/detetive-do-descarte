// src/features/Case04_Glass/components/ProtocolGame.jsx
import React, { useState } from 'react';
import { gsap } from 'gsap';

const PROTOCOL_STEPS = [
  { id: 'embrulhar', text: '📦 1. Embrulhar em Papelão/Jornal', order: 1 },
  { id: 'identificar', text: '✍️ 2. Escrever "Cuidado: Vidro"', order: 2 },
  { id: 'descartar', text: '🟢 3. Depositar na Lixeira Verde', order: 3 }
];

export const ProtocolGame = ({ onSuccess }) => {
  const [currentOrder, setCurrentOrder] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleStepClick = (step) => {
    // Se o passo já foi feito, ignora
    if (completedSteps.includes(step.id)) return;

    if (step.order === currentOrder) {
      // ACERTOU O PASSO DO PROTOCOLO
      setCompletedSteps([...completedSteps, step.id]);
      setCurrentOrder(currentOrder + 1);

      // Animação de sucesso no botão clicado
      gsap.fromTo(`#step-${step.id}`, 
        { scale: 1 }, 
        { scale: 1.05, backgroundColor: '#22c55e', borderColor: '#000', duration: 0.2, yoyo: true, repeat: 1 }
      );

      // Se completou os 3 passos na ordem certa
      if (step.order === 3) {
        setTimeout(onSuccess, 600);
      }
    } else {
      // ERROU O PROTOCOLO: Treme a arena inteira em sinal de perigo
      alert("🚨 PROTOCOLO VIOLADO!\nDescartar vidro quebrado sem proteção coloca a vida dos coletores em risco. Siga as normas de segurança na ordem correta!");
      
      gsap.timeline()
        .to("#protocol-arena", { x: -10, duration: 0.05, yoyo: true, repeat: 5 })
        .to("#protocol-arena", { x: 0, duration: 0.05, onComplete: () => {
          // Reseta o jogo para o início
          setCurrentOrder(1);
          setCompletedSteps([]);
        }});
    }
  };

  return (
    <div 
      id="protocol-arena"
      className="w-full max-w-xl bg-neutral-900 border-4 border-black p-6 rounded-lg flex flex-col items-center shadow-[8px_8px_0_#000]"
    >
      <div className="text-center mb-6">
        <div className="text-4xl mb-2 animate-bounce">⚠️ 🫙 💥</div>
        <h3 className="text-md font-mono font-bold text-yellow-400 uppercase tracking-wider">
          Protocolo de Acidente com Vidro
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Ative as medidas de contenção na ordem correta de segurança:
        </p>
      </div>

      {/* BOTÕES DO SEQUENCIADOR */}
      <div className="flex flex-col gap-3 w-full">
        {PROTOCOL_STEPS.map((step) => {
          const isDone = completedSteps.includes(step.id);
          return (
            <button
              key={step.id}
              id={`step-${step.id}`}
              onClick={() => handleStepClick(step)}
              className={`
                w-full p-4 border-4 border-black font-black text-sm text-left rounded-md transition-all cursor-pointer select-none
                ${isDone 
                  ? 'bg-emerald-500 text-black shadow-none translate-y-1 border-neutral-900' 
                  : 'bg-neutral-800 text-neutral-200 shadow-[4px_4px_0_#000] hover:bg-neutral-700 active:translate-y-0.5'
                }
              `}
            >
              <div className="flex justify-between items-center">
                <span>{step.text}</span>
                {isDone && <span className="text-md">✅</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* BARRA DE STATUS DE COMPLIANCE */}
      <div className="w-full bg-black h-3 border-2 border-black mt-6 rounded-full overflow-hidden">
        <div 
          className="bg-emerald-400 h-full transition-all duration-300"
          style={{ width: `${(completedSteps.length / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};