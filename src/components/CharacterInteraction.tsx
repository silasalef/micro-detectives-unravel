
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface CharacterInteractionProps {
  message: string;
  onClose: () => void;
}

const CharacterInteraction: React.FC<CharacterInteractionProps> = ({ 
  message, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed top-20 right-6 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
    }`}>
      <div className="bg-white/95 backdrop-blur-sm border-2 border-purple-300 rounded-2xl p-4 shadow-2xl max-w-xs">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 animate-bounce">
            🦸
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800 leading-relaxed">
              {message}
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Speech bubble tail */}
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white/95 border-b-2 border-r-2 border-purple-300 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default CharacterInteraction;
