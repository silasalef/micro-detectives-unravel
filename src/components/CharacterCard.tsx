
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Sparkles, Zap } from 'lucide-react';

interface CharacterCardProps {
  title: string;
  description: string;
  color: string;
  details?: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  title, 
  description, 
  color, 
  details 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group hover:scale-105 transition-all duration-300 border-2 hover:shadow-2xl cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efeito de brilho de fundo sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Partículas flutuantes sutis no hover */}
      {isHovered && (
        <>
          <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="absolute top-4 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute top-6 right-4 w-1 h-1 bg-purple-400 rounded-full opacity-60"></div>
        </>
      )}

      <CardContent className="p-6 relative z-10">
        <div 
          className={`w-full h-32 bg-gradient-to-br ${color} rounded-2xl mb-4 flex items-center justify-center text-white text-4xl relative overflow-hidden shadow-lg`}
          onClick={() => setShowDetails(!showDetails)}
        >
          {/* Efeito de shimmer sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <span className="relative z-10 drop-shadow-lg">{title.split(' ')[0]}</span>
          
          <div className="absolute top-2 right-2 group">
            <Info className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 opacity-70" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-center drop-shadow-sm">{title}</h3>
        <p className="text-gray-600 text-center leading-relaxed mb-3">{description}</p>
        
        {details && (
          <div 
            className={`transition-all duration-500 overflow-hidden ${
              showDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-3 rounded-xl border-2 border-gray-200 mt-3 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-50"></div>
              <p className="text-sm text-gray-700 font-medium relative z-10">
                <span className="text-blue-600 flex items-center gap-1 mb-1">
                  <Zap className="w-3 h-3" />
                  Detalhes:
                </span> 
                {details}
              </p>
            </div>
          </div>
        )}
        
        <div className="text-center mt-3">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-all duration-300 hover:scale-105 flex items-center gap-1 mx-auto"
          >
            <Sparkles className="w-3 h-3" />
            {showDetails ? '▲ Menos detalhes' : '▼ Mais detalhes'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
