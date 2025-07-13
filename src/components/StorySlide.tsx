
import React, { useState, useEffect } from 'react';

interface StorySlideProps {
  content: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideRight';
}

const StorySlide: React.FC<StorySlideProps> = ({ content, animation = 'fadeIn' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
    // Criar partículas flutuantes
    const particleIds = Array.from({ length: 6 }, (_, i) => i);
    setParticles(particleIds);
  }, []);

  const animationClass = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideRight: 'animate-slide-right'
  }[animation];

  return (
    <div className={`${animationClass} space-y-6 relative`}>
      {/* Partículas flutuantes de fundo */}
      {particles.map(id => (
        <div
          key={id}
          className="absolute pointer-events-none opacity-20"
          style={{
            left: `${10 + (id * 15)}%`,
            top: `${20 + (id * 10)}%`,
            animationDelay: `${id * 0.5}s`
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
        </div>
      ))}

      <div className="text-xl leading-relaxed text-gray-700 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-blue-300 shadow-xl relative overflow-hidden">
        {/* Efeito de shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse"></div>
        <p className="text-center font-medium relative z-10 drop-shadow-sm">{content}</p>
      </div>
      
      <div className="flex justify-center">
        <div className="relative group">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-6xl animate-pulse shadow-2xl relative overflow-hidden">
            {/* Efeito de brilho rotativo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45 animate-spin"></div>
            <span className="relative z-10 drop-shadow-lg">🔬</span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xl animate-bounce shadow-lg">
            <span className="drop-shadow-sm">✨</span>
          </div>
          {/* Ondas de energia */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-300/30 animate-ping"></div>
          <div className="absolute -inset-4 rounded-full border-2 border-blue-400/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default StorySlide;
