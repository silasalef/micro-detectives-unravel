
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface InteractiveQuestionProps {
  question: string;
  options: string[];
  onResponse: (response: string) => void;
}

const InteractiveQuestion: React.FC<InteractiveQuestionProps> = ({ 
  question, 
  options, 
  onResponse 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);
    onResponse(option);
  };

  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-300">
        <p className="text-center font-medium">{question}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleOptionClick(option)}
            variant={selectedOption === option ? "default" : "outline"}
            size="lg"
            className={`h-auto p-4 text-left justify-start transition-all duration-300 ${
              selectedOption === option 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white transform scale-105' 
                : 'hover:bg-purple-50 hover:border-purple-300'
            }`}
            disabled={showFeedback}
          >
            <div className="flex items-center gap-3">
              {selectedOption === option && <CheckCircle className="w-5 h-5" />}
              <span className="font-medium text-lg">
                {String.fromCharCode(65 + index)}) {option}
              </span>
            </div>
          </Button>
        ))}
      </div>

      {showFeedback && (
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-2xl border-2 border-green-300 animate-slide-up">
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Excelente participação!</h3>
            <p className="text-gray-700">
              Todas as respostas nos ajudam a entender melhor como pensamos sobre saúde. 
              Vamos descobrir mais sobre os antibióticos!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveQuestion;
