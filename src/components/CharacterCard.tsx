
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

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

  return (
    <Card className="group hover:scale-105 transition-all duration-300 border-2 hover:shadow-xl cursor-pointer">
      <CardContent className="p-6">
        <div 
          className={`w-full h-32 bg-gradient-to-r ${color} rounded-2xl mb-4 flex items-center justify-center text-white text-4xl group-hover:animate-pulse relative`}
          onClick={() => setShowDetails(!showDetails)}
        >
          {title.split(' ')[0]}
          <div className="absolute top-2 right-2">
            <Info className="w-5 h-5 opacity-70 hover:opacity-100" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
        <p className="text-gray-600 text-center leading-relaxed mb-3">{description}</p>
        
        {details && (
          <div 
            className={`transition-all duration-300 overflow-hidden ${
              showDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-200 mt-3">
              <p className="text-sm text-gray-700 font-medium">
                <span className="text-blue-600">🔍 Detalhes:</span> {details}
              </p>
            </div>
          </div>
        )}
        
        <div className="text-center mt-3">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            {showDetails ? '▲ Menos detalhes' : '▼ Mais detalhes'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
