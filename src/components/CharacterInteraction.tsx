
import React, { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface CharacterInteractionProps {
  message: string;
  onClose: () => void;
}

const CharacterInteraction: React.FC<CharacterInteractionProps> = ({ 
  message, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
    // Criar partículas de celebração
    const particleIds = Array.from({ length: 4 }, (_, i) => i);
    setParticles(particleIds);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed top-20 right-6 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
    }`}>
      {/* Partículas flutuantes */}
      {particles.map(id => (
        <div
          key={id}
          className="absolute pointer-events-none"
          style={{
            left: `${10 + (id * 20)}%`,
            top: `${5 + (id * 15)}%`,
            animationDelay: `${id * 0.3}s`
          }}
        >
          <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
        </div>
      ))}

      <div className="bg-white/95 backdrop-blur-sm border-2 border-purple-400 rounded-2xl p-4 shadow-2xl max-w-xs relative overflow-hidden">
        {/* Efeito de brilho */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 animate-bounce shadow-lg relative overflow-hidden">
            {/* Efeito de brilho rotativo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-45 animate-spin"></div>
            <span className="relative z-10 drop-shadow-sm">🦸</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800 leading-relaxed drop-shadow-sm">
              {message}
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 transform"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Speech bubble tail com gradiente */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-gradient-to-br from-purple-100 to-white border-b-2 border-r-2 border-purple-400 transform rotate-45"></div>
        
        {/* Ondas de energia */}
        <div className="absolute -inset-2 border-2 border-purple-300/20 rounded-2xl animate-ping"></div>
      </div>
    </div>
  );
};

export default CharacterInteraction;
