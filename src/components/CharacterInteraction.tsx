
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
    // Criar partículas de celebração sutis
    const particleIds = Array.from({ length: 3 }, (_, i) => i);
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
      {/* Partículas flutuantes sutis */}
      {particles.map(id => (
        <div
          key={id}
          className="absolute pointer-events-none opacity-60"
          style={{
            left: `${10 + (id * 25)}%`,
            top: `${5 + (id * 20)}%`,
            animationDelay: `${id * 0.5}s`
          }}
        >
          <Sparkles className="w-3 h-3 text-yellow-400" />
        </div>
      ))}

      <div className="bg-white/95 backdrop-blur-sm border-2 border-purple-400 rounded-2xl p-4 shadow-2xl max-w-xs relative overflow-hidden">
        {/* Efeito de brilho sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
        
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg relative overflow-hidden">
            {/* Efeito de brilho sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
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
        
        {/* Ondas de energia sutis */}
        <div className="absolute -inset-2 border border-purple-300/20 rounded-2xl opacity-40"></div>
      </div>
    </div>
  );
};

export default CharacterInteraction;
