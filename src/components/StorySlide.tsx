
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
    // Criar partículas flutuantes sutis
    const particleIds = Array.from({ length: 4 }, (_, i) => i);
    setParticles(particleIds);
  }, []);

  const animationClass = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideRight: 'animate-slide-right'
  }[animation];

  return (
    <div className={`${animationClass} space-y-6 relative`}>
      {/* Partículas flutuantes de fundo sutis */}
      {particles.map(id => (
        <div
          key={id}
          className="absolute pointer-events-none opacity-10"
          style={{
            left: `${10 + (id * 20)}%`,
            top: `${20 + (id * 15)}%`,
            animationDelay: `${id * 1}s`
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
        </div>
      ))}

      <div className="text-xl leading-relaxed text-gray-700 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-blue-300 shadow-xl relative overflow-hidden">
        {/* Efeito de shimmer sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30"></div>
        <p className="text-center font-medium relative z-10 drop-shadow-sm">{content}</p>
      </div>
      
      <div className="flex justify-center">
        <div className="relative group">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-6xl shadow-2xl relative overflow-hidden">
            {/* Efeito de brilho rotativo sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
            <span className="relative z-10 drop-shadow-lg">🔬</span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xl shadow-lg">
            <span className="drop-shadow-sm">✨</span>
          </div>
          {/* Ondas de energia sutis */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-300/20 opacity-60"></div>
          <div className="absolute -inset-4 rounded-full border border-blue-400/10 opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default StorySlide;
