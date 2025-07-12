
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

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

  return (
    <Card 
      className={`group hover:scale-105 transition-all duration-300 border-2 hover:shadow-xl cursor-pointer ${
        isActive ? 'ring-2 ring-purple-400 ring-opacity-60' : ''
      }`}
      onClick={() => setIsActive(!isActive)}
    >
      <CardContent className="p-6">
        <div className={`w-full h-24 bg-gradient-to-r ${color} rounded-2xl mb-4 flex items-center justify-center text-white text-3xl group-hover:animate-bounce relative`}>
          {title.split(' ')[0]}
          <div className="absolute top-1 right-1">
            <Zap className="w-4 h-4 opacity-80" />
          </div>
        </div>
        <h3 className="text-lg font-bold mb-1 text-center">{title}</h3>
        <p className="text-sm text-purple-600 font-medium text-center mb-3">{subtitle}</p>
        <p className="text-gray-600 text-sm text-center leading-relaxed mb-3">{description}</p>
        
        {details && (
          <div 
            className={`transition-all duration-300 overflow-hidden ${
              isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl border border-blue-200 mt-3">
              <p className="text-xs text-gray-700 font-medium text-center">
                <span className="text-blue-600">⚡ Mecanismo:</span> {details}
              </p>
            </div>
          </div>
        )}
        
        <div className="text-center mt-3">
          <div className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${
            isActive ? 'text-purple-700' : 'text-gray-500'
          }`}>
            <Zap className="w-3 h-3" />
            {isActive ? 'Mecanismo Ativo!' : 'Clique para ativar'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MechanismDemo;
