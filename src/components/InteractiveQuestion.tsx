
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, Star, Sparkles, Zap } from 'lucide-react';

interface InteractiveQuestionProps {
  question: string;
  options: string[];
  correctAnswer?: number;
  explanations?: string[];
  onResponse: (response: string, isCorrect: boolean) => void;
}

const InteractiveQuestion: React.FC<InteractiveQuestionProps> = ({ 
  question, 
  options, 
  correctAnswer,
  explanations = [],
  onResponse 
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number}[]>([]);

  // Função para criar partículas de celebração
  const createParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  // Função para tocar sons usando Web Audio API
  const playSound = (frequency: number, duration: number, type: 'success' | 'error') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (type === 'success') {
      // Som alegre - acordes ascendentes com mais complexidade
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration + (index * 0.08));
        
        oscillator.start(audioContext.currentTime + (index * 0.08));
        oscillator.stop(audioContext.currentTime + duration + (index * 0.08));
      });
    } else {
      // Som triste - acordes descendentes mais elaborados
      [400, 350, 300, 250].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration + (index * 0.12));
        
        oscillator.start(audioContext.currentTime + (index * 0.12));
        oscillator.stop(audioContext.currentTime + duration + (index * 0.12));
      });
    }
  };

  const handleOptionClick = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    const isCorrect = correctAnswer !== undefined && optionIndex === correctAnswer;
    
    if (isCorrect) {
      createParticles();
    }
    
    // Tocar som baseado na resposta
    try {
      if (isCorrect) {
        playSound(523.25, 0.8, 'success');
      } else {
        playSound(300, 1.0, 'error');
      }
    } catch (error) {
      console.log('Audio não disponível neste navegador');
    }
    
    onResponse(options[optionIndex], isCorrect);
  };

  return (
    <div className="space-y-6 relative">
      {/* Partículas de celebração */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-50 opacity-80"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: 'float 2s ease-out forwards'
          }}
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
      ))}

      <div className="text-lg text-gray-700 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 p-6 rounded-2xl border-2 border-yellow-300 shadow-lg relative overflow-hidden">
        {/* Efeito de brilho sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30"></div>
        <p className="text-center font-medium flex items-center justify-center gap-3 relative z-10">
          <span className="text-3xl">🎯</span>
          {question}
          <span className="text-2xl">✨</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = correctAnswer !== undefined && index === correctAnswer;
          const isWrong = showFeedback && isSelected && !isCorrect;
          
          return (
            <Button
              key={index}
              onClick={() => handleOptionClick(index)}
              variant={isSelected ? "default" : "outline"}
              size="lg"
              className={`h-auto p-4 text-left justify-start transition-all duration-300 whitespace-normal break-words relative overflow-hidden group ${
                isSelected && isCorrect
                  ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white transform scale-105 shadow-xl border-green-300' 
                  : isWrong
                  ? 'bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white shadow-xl border-red-300'
                  : isSelected
                  ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white transform scale-105 shadow-xl border-blue-300'
                  : 'hover:bg-gradient-to-br hover:from-purple-50 hover:via-pink-50 hover:to-blue-50 hover:border-purple-400 hover:scale-102 hover:shadow-md border-2 border-gray-200'
              }`}
              disabled={showFeedback}
            >
              {/* Efeito de shimmer sutil para botões não selecionados */}
              {!isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
              
              <div className="flex items-start gap-3 w-full relative z-10">
                <div className="flex-shrink-0 mt-1">
                  {showFeedback && isSelected && (
                    <>
                      {isCorrect ? (
                        <div className="relative">
                          <CheckCircle className="w-6 h-6 text-green-100" />
                          <div className="absolute -inset-1 bg-green-400/20 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="relative">
                          <X className="w-6 h-6 text-red-100" />
                          <div className="absolute -inset-1 bg-red-400/20 rounded-full"></div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <span className="font-medium text-base flex-1 leading-relaxed">
                  <span className="font-bold text-xl mr-3 drop-shadow-sm">
                    {String.fromCharCode(65 + index)})
                  </span>
                  {option}
                </span>
                <div className="flex-shrink-0">
                  {showFeedback && isCorrect && index === correctAnswer && (
                    <div className="relative">
                      <Star className="w-6 h-6 text-yellow-300" />
                      <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
                    </div>
                  )}
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      {showFeedback && selectedOption !== null && (
        <div className="space-y-4 animate-fade-in">
          {/* Feedback específico para a resposta selecionada */}
          <div className={`p-6 rounded-2xl border-2 shadow-xl relative overflow-hidden ${
            correctAnswer !== undefined && selectedOption === correctAnswer
              ? 'bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 border-green-400'
              : 'bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-100 border-orange-400'
          }`}>
            {/* Efeito de brilho de fundo sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
            <div className="text-center relative z-10">
              <div className="text-3xl mb-3">
                {correctAnswer !== undefined && selectedOption === correctAnswer ? '🎉' : '🤔'}
              </div>
              <div className="text-lg font-medium mb-3 leading-relaxed drop-shadow-sm">
                {explanations[selectedOption] || 'Obrigado pela participação!'}
              </div>
            </div>
          </div>

          {/* Mostrar a resposta correta se a pessoa errou */}
          {correctAnswer !== undefined && selectedOption !== correctAnswer && (
            <div className="bg-gradient-to-br from-blue-100 via-cyan-100 to-sky-100 p-6 rounded-2xl border-2 border-blue-400 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
              <div className="text-center relative z-10">
                <div className="text-lg font-medium text-blue-800 mb-2 flex items-center justify-center gap-2">
                  <span className="text-2xl">💡</span>
                  A resposta ideal seria:
                </div>
                <div className="font-bold text-blue-900 mb-3 leading-relaxed text-xl drop-shadow-sm">
                  {String.fromCharCode(65 + correctAnswer)}) {options[correctAnswer]}
                </div>
                <div className="text-blue-700 leading-relaxed font-medium">
                  {explanations[correctAnswer]}
                </div>
              </div>
            </div>
          )}

          {/* Informação adicional educativa */}
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4 rounded-xl border-2 border-purple-300 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
            <div className="text-center text-sm text-purple-800 leading-relaxed relative z-10">
              <strong className="flex items-center justify-center gap-2 text-base mb-2">
                <span>💫</span>
                Dica para Detetives:
                <span>🔬</span>
              </strong>
              Cada resposta nos ensina algo novo sobre como os antibióticos funcionam. 
              Continue explorando para desvendar todos os mistérios moleculares!
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100px) rotate(180deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default InteractiveQuestion;
