
import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';

interface GameScoreProps {
  score: number;
  correct: number;
  total: number;
}

const GameScore: React.FC<GameScoreProps> = ({ score, correct, total }) => {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const getScoreColor = () => {
    if (score >= 400) return 'from-yellow-400 to-yellow-600';
    if (score >= 300) return 'from-green-400 to-green-600';
    if (score >= 200) return 'from-blue-400 to-blue-600';
    return 'from-purple-400 to-purple-600';
  };

  const getTitle = () => {
    if (score >= 400) return 'Detetive Molecular Master! 🏆';
    if (score >= 300) return 'Especialista em Antibióticos! 🌟';
    if (score >= 200) return 'Investigador Avançado! 🔍';
    return 'Explorador da Ciência! 🔬';
  };

  return (
    <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-purple-200">
      <div className={`p-2 bg-gradient-to-r ${getScoreColor()} rounded-lg text-white`}>
        <Trophy className="w-5 h-5" />
      </div>
      
      <div className="text-sm">
        <div className="font-bold text-gray-800 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500" />
          {score} pts
        </div>
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <Target className="w-3 h-3" />
          {correct}/{total} ({accuracy}%)
        </div>
      </div>
      
      <div className="text-xs font-medium text-purple-700 max-w-32 leading-tight">
        {getTitle()}
      </div>
    </div>
  );
};

export default GameScore;
