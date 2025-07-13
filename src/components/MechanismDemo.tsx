
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Sparkles, Star } from 'lucide-react';

interface MechanismDemoProps {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  details?: string;
}

const MechanismDemo: React.FC<MechanismDemoProps> = ({ 
  title, 
  subtitle, 
  description, 
  color,
  details 
}) => {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const handleClick = () => {
    setIsActive(!isActive);
    if (!isActive) {
      // Criar partículas de ativação
      const particleIds = Array.from({ length: 8 }, (_, i) => i);
      setParticles(particleIds);
      setTimeout(() => setParticles([]), 2000);
    }
  };

  return (
    <Card 
      className={`group hover:scale-105 transition-all duration-500 border-2 hover:shadow-2xl cursor-pointer relative overflow-hidden ${
        isActive ? 'ring-4 ring-purple-400/60 ring-opacity-60 shadow-2xl' : ''
      }`}
      onClick={handleClick}
    >
      {/* Partículas de ativação */}
      {particles.map(id => (
        <div
          key={id}
          className="absolute pointer-events-none z-50"
          style={{
            left: `${10 + (id * 10)}%`,
            top: `${20 + (id * 8)}%`,
            animationDelay: `${id * 0.1}s`
          }}
        >
          <Star className="w-3 h-3 text-yellow-400 animate-ping" />
        </div>
      ))}

      {/* Efeito de energia quando ativo */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 animate-pulse"></div>
      )}

      <CardContent className="p-6 relative z-10">
        <div className={`w-full h-24 bg-gradient-to-br ${color} rounded-2xl mb-4 flex items-center justify-center text-white text-3xl group-hover:animate-bounce relative overflow-hidden shadow-lg ${
          isActive ? 'animate-pulse shadow-2xl' : ''
        }`}>
          {/* Efeito de shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <span className="relative z-10 drop-shadow-lg">{title.split(' ')[0]}</span>
          
          <div className="absolute top-1 right-1">
            <Zap className={`w-4 h-4 opacity-80 ${isActive ? 'animate-spin text-yellow-300' : ''}`} />
          </div>
          
          {/* Ondas de energia quando ativo */}
          {isActive && (
            <>
              <div className="absolute inset-0 border-2 border-white/30 rounded-2xl animate-ping"></div>
              <div className="absolute -inset-2 border border-white/20 rounded-2xl animate-pulse"></div>
            </>
          )}
        </div>
        
        <h3 className="text-lg font-bold mb-1 text-center drop-shadow-sm">{title}</h3>
        <p className="text-sm text-purple-600 font-medium text-center mb-3 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 animate-pulse" />
          {subtitle}
        </p>
        <p className="text-gray-600 text-sm text-center leading-relaxed mb-3">{description}</p>
        
        {details && (
          <div 
            className={`transition-all duration-500 overflow-hidden ${
              isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-3 rounded-xl border-2 border-blue-300 mt-3 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              <p className="text-xs text-gray-700 font-medium text-center relative z-10">
                <span className="text-blue-600 flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-3 h-3 animate-bounce" />
                  Mecanismo:
                </span> 
                {details}
              </p>
            </div>
          </div>
        )}
        
        <div className="text-center mt-3">
          <div className={`inline-flex items-center gap-1 text-xs font-medium transition-all duration-300 ${
            isActive ? 'text-purple-700 scale-110' : 'text-gray-500'
          }`}>
            <Zap className={`w-3 h-3 ${isActive ? 'animate-spin' : 'animate-pulse'}`} />
            <Sparkles className="w-3 h-3 animate-pulse" />
            {isActive ? 'Mecanismo Ativo!' : 'Clique para ativar'}
            <Star className={`w-3 h-3 ${isActive ? 'animate-bounce' : ''}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MechanismDemo;
