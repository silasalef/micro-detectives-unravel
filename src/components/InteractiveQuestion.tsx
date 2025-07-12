
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, Star } from 'lucide-react';

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

  // Função para tocar sons usando Web Audio API
  const playSound = (frequency: number, duration: number, type: 'success' | 'error') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (type === 'success') {
      // Som alegre - acordes ascendentes
      [523.25, 659.25, 783.99].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration + (index * 0.1));
        
        oscillator.start(audioContext.currentTime + (index * 0.1));
        oscillator.stop(audioContext.currentTime + duration + (index * 0.1));
      });
    } else {
      // Som triste - acordes descendentes
      [400, 350, 300].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration + (index * 0.15));
        
        oscillator.start(audioContext.currentTime + (index * 0.15));
        oscillator.stop(audioContext.currentTime + duration + (index * 0.15));
      });
    }
  };

  const handleOptionClick = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    const isCorrect = correctAnswer !== undefined && optionIndex === correctAnswer;
    
    // Tocar som baseado na resposta
    try {
      if (isCorrect) {
        playSound(523.25, 0.6, 'success'); // Dó maior - som alegre
      } else {
        playSound(300, 0.8, 'error'); // Som mais grave e triste
      }
    } catch (error) {
      console.log('Audio não disponível neste navegador');
    }
    
    onResponse(options[optionIndex], isCorrect);
  };

  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-300">
        <p className="text-center font-medium flex items-center justify-center gap-3">
          <span className="text-2xl">🎯</span>
          {question}
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
              className={`h-auto p-4 text-left justify-start transition-all duration-300 whitespace-normal break-words ${
                isSelected && isCorrect
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white transform scale-105 animate-pulse' 
                  : isWrong
                  ? 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                  : isSelected
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white transform scale-105'
                  : 'hover:bg-purple-50 hover:border-purple-300 hover:scale-105'
              }`}
              disabled={showFeedback}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0 mt-1">
                  {showFeedback && isSelected && (
                    <>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-100" />
                      ) : (
                        <X className="w-5 h-5 text-red-100" />
                      )}
                    </>
                  )}
                </div>
                <span className="font-medium text-base flex-1 leading-relaxed">
                  <span className="font-bold text-lg mr-2">
                    {String.fromCharCode(65 + index)})
                  </span>
                  {option}
                </span>
                <div className="flex-shrink-0">
                  {showFeedback && isCorrect && index === correctAnswer && (
                    <Star className="w-5 h-5 text-yellow-300 animate-spin" />
                  )}
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      {showFeedback && selectedOption !== null && (
        <div className="space-y-4 animate-slide-up">
          {/* Feedback específico para a resposta selecionada */}
          <div className={`p-6 rounded-2xl border-2 ${
            correctAnswer !== undefined && selectedOption === correctAnswer
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300'
              : 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300'
          }`}>
            <div className="text-center">
              <div className="text-2xl mb-2">
                {correctAnswer !== undefined && selectedOption === correctAnswer ? '🎉' : '🤔'}
              </div>
              <div className="text-lg font-medium mb-3 leading-relaxed">
                {explanations[selectedOption] || 'Obrigado pela participação!'}
              </div>
            </div>
          </div>

          {/* Mostrar a resposta correta se a pessoa errou */}
          {correctAnswer !== undefined && selectedOption !== correctAnswer && (
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-2xl border-2 border-blue-300">
              <div className="text-center">
                <div className="text-lg font-medium text-blue-800 mb-2">
                  💡 A resposta ideal seria:
                </div>
                <div className="font-bold text-blue-900 mb-2 leading-relaxed">
                  {String.fromCharCode(65 + correctAnswer)}) {options[correctAnswer]}
                </div>
                <div className="text-blue-700 leading-relaxed">
                  {explanations[correctAnswer]}
                </div>
              </div>
            </div>
          )}

          {/* Informação adicional educativa */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
            <div className="text-center text-sm text-purple-800 leading-relaxed">
              <strong>💫 Dica para Detetives:</strong> Cada resposta nos ensina algo novo sobre como os antibióticos funcionam. 
              Continue explorando para desvendar todos os mistérios moleculares!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveQuestion;
