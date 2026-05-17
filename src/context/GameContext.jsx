// src/context/GameContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

// Chave única para salvar os dados no navegador
const LOCAL_STORAGE_KEY = 'detetive_descarte_progress';

export const GameProvider = ({ children }) => {
  // O estado inicial agora tenta "lembrar" se há um jogo salvo, senão usa o padrão
  const [gameState, setGameState] = useState(() => {
    const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedProgress) {
      try {
        return JSON.parse(savedProgress);
      } catch (e) {
        console.error("Erro ao carregar progresso antigo:", e);
      }
    }
    // Padrão inicial se for a primeira vez jogando
    return {
      playerName: '',
      playerAvatar: '🦮',
      currentCase: 1,
      casesSolved: {
        case1: false,
        case2: false,
        case3: false,
        case4: false,
      },
      score: 0,
    };
  });

  // 🔄 EFEITO DE SALVAMENTO: Sempre que o gameState mudar, grava no LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  // Função disparada ao resolver um mini-game
  const solveCase = (caseId) => {
    setGameState((prev) => {
      const updatedCases = { ...prev.casesSolved, [caseId]: true };
      
      let nextCase = prev.currentCase;
      if (caseId === 'case1') nextCase = 2;
      if (caseId === 'case2') nextCase = 3;
      if (caseId === 'case3') nextCase = 4;

      return {
        ...prev,
        casesSolved: updatedCases,
        currentCase: nextCase,
        score: prev.score + 250,
      };
    });
  };

  // Reseta o estado E limpa a memória do navegador para começar do zero absoluto
  const resetGame = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Deleta o save anterior
    setGameState({
      playerName: '',
      playerAvatar: '🦮',
      currentCase: 1,
      casesSolved: {
        case1: false,
        case2: false,
        case3: false,
        case4: false,
      },
      score: 0,
    });
  };

  return (
    <GameContext.Provider value={{ gameState, solveCase, setGameState, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame deve ser usado dentro de um GameProvider');
  }
  return context;
};